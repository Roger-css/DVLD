
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

    public async Task<IEnumerable<TestType>?> GetAllTestTypes()
    {
        var result = await _context.TestTypes.ToListAsync();
        if (result.Count > 0)
            return result;
        return null;
    }
    public async Task UpdateTestType(TestType test)
    {
        await _context.TestTypes.Where(e => e.Id == test.Id).ExecuteUpdateAsync(e => e
        .SetProperty(entity => entity.TestTypeTitle, test.TestTypeTitle)
        .SetProperty(entity => entity.TestTypeDescription, test.TestTypeDescription)
        .SetProperty(entity => entity.TestTypeFees, test.TestTypeFees));
    }
    public async Task<LdlaDetailsWithAppointments?> LdlaDetailsWithAppointments(int id, int typeId)
    {
        var result = await _context.LocalDrivingLicenseApplications
            .Select(e => new LdlaDetailsWithAppointments()
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
        await _dbSet.Where(e => e.Id == entityId)
            .ExecuteUpdateAsync(e => e.SetProperty(e => e.IsLocked, true));
    }

    public async Task<bool> IsFirstTest(int Id, int testTypeId)
    {
        var entity = await _dbSet
            .FirstOrDefaultAsync(e => e.LocalDrivingLicenseApplicationId == Id && e.TestTypeId == testTypeId);
        if (entity == null) return true;
        return false;
    }

    public async Task<Application> CreateRetakeTest(TestAppointment entity)
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
