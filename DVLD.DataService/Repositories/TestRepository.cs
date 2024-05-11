
using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class TestRepository : GenericRepository<TestAppointment>, ITestRepository
{
    public TestRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }

    public async Task<IEnumerable<TestType>> GetAllTestTypes()
    {
        return await _context.TestTypes.ToListAsync();
    }
    public async Task<bool> UpdateTestType(TestType test)
    {
        var entity = await _context.TestTypes.FirstOrDefaultAsync(e => e.Id == test.Id);
        if (entity == null)
            return false;
        entity.TestTypeTitle = test.TestTypeTitle;
        entity.TestTypeDescription = test.TestTypeDescription;
        entity.TestTypeFees = test.TestTypeFees;
        return true;
    }
    public async Task<LdlaDetailsWithAppointments?> LdlaDetailsWithAppointments(int id, int typeId)
    {
        var result = await _context.LocalDrivingLicenseApplications.Select(e => new LdlaDetailsWithAppointments()
        {
            Id = id,
            ApplicationId = e.ApplicationId,
            ApplicationType = e.Application.ApplicationType.ApplicationTypeTitle,
            CreatedBy = e.Application.User.UserName,
            Date = e.Application.CreatedAt,
            LicenseClass = e.LicenseClass.ClassName,
            Name = $"{e.Application.Person.FirstName} {e.Application.Person.SecondName}" +
            $" {e.Application.Person.ThirdName} {e.Application.Person.LastName}",
            PaidFees = e.Application.PaidFees,
            Status = e.Application.ApplicationStatus,
            StatusDate = e.Application.LastStatusDate,
            TestAppointments = _context.TestAppointments
            .Where(test => test.LocalDrivingLicenseApplicationId == id && test.TestTypeId == typeId)
            .ToList()
        }).FirstOrDefaultAsync();
        return result;
    }

    public async Task<TestAppointment> CreateAppointment(TestAppointment entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public async Task<Test> CreateNewTest(Test test)
    {
        await _context.Tests.AddAsync(test);
        return test;
    }

    public async Task LockAppointment(int entityId)
    {
        var entity = await _dbSet.Where(e => e.Id == entityId).FirstOrDefaultAsync();
        if(entity == null)
            return;
        entity.IsLocked = true;
    }

    public async Task<bool> IsFirstTest(int Id, int testTypeId)
    {
        var entity = await _dbSet
            .FirstOrDefaultAsync(e => e.LocalDrivingLicenseApplicationId == Id && e.TestTypeId == testTypeId);
        if(entity == null) return true;
        return false;
    }

    public async Task<Application> Create2ndTest(TestAppointment entity)
    {
        var Application = await _context.LocalDrivingLicenseApplications
            .Include(e => e.Application)
            .FirstOrDefaultAsync(e => e.Id.Equals(entity.LocalDrivingLicenseApplicationId));
        var Fees = await _context.ApplicationTypes.FirstOrDefaultAsync(e => e.ApplicationTypeId == 7);
        var RetakeTestApplication = new Application()
        {
            ApplicationPersonId = Application!.Application.ApplicationPersonId,
            PaidFees = Fees!.ApplicationTypeFees,
            CreatedAt = DateTime.Now,
            ApplicationStatus = Entities.Enums.EnApplicationStatus.New,
            ApplicationTypeId = 7,
            CreatedByUserId = entity.CreatedByUserId,
            LastStatusDate = DateTime.Now,
        };
        await _context.Applications.AddAsync(RetakeTestApplication);
        return RetakeTestApplication;
    }
    public async Task<bool> UpdateTestAppointment(UpdateAppointmentRequest test)
    {
        var entity = await _dbSet.FirstOrDefaultAsync(e => e.Id == test.Id);
        if (entity == null)
            return false;
        entity.AppointmentDate = test.AppointmentDate;
        return true;
    }
}
