using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Enums;
using DVLD.Entities.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class ApplicationRepository : GenericRepository<Application>, IApplicationRepository
{
    public ApplicationRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }
    public async Task<bool> UpdateType(ApplicationType applicationType)
    {
        try
        {
            var entity = await _context.ApplicationTypes.FindAsync(applicationType.ApplicationTypeId);
            if (entity == null)
                return false;
            entity.ApplicationTypeTitle = applicationType.ApplicationTypeTitle;
            entity.ApplicationTypeFees = applicationType.ApplicationTypeFees;
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError("{ex}", ex);
        }
        return false;
    }
    public async Task<IEnumerable<ApplicationType>?> GetAllTypes()
    {
        var list = await _context.ApplicationTypes.ToListAsync();
        if (list is not null)
            return list;
        return null;
    }
    public async Task<bool> DoesPersonHasLDLA(int PersonId, int classId)
    {
        var LDLAExist = await _context.LocalDrivingLicenseApplications
            .FirstOrDefaultAsync(e => e.Application.ApplicationPersonId == PersonId &&
            e.LicenseClassId == classId &&
            e.Application.ApplicationStatus != EnApplicationStatus.Cancelled);
        if (LDLAExist == null) return false;
        return true;
    }

    public async Task<Application> CreateLdlApplication(ApplicationRequest Param)
    {
        var Application = new Application()
        {
            ApplicationPersonId = Param.PersonId,
            ApplicationStatus = EnApplicationStatus.New,
            ApplicationTypeId = 1,
            CreatedAt = DateTime.UtcNow,
            CreatedByUserId = Param.creatorId,
            LastStatusDate = DateTime.Parse(Param.date),
            PaidFees = Param.fees,
        };
        await _dbSet.AddAsync(Application);
        return Application;
    }

    public async Task<LocalDrivingLicenseApplication> CreateLDLA(int AppId, int ClassId)
    {
        var LDLA = new LocalDrivingLicenseApplication()
        {
            ApplicationId = AppId,
            LicenseClassId = ClassId
        };
        await _context.LocalDrivingLicenseApplications.AddAsync(LDLA);
        return LDLA;
    }
    public async Task<bool> DeleteLdla(int id)
    {
        var PassedTests = await _context.LDLAView
            .Where(e => e.Id == id)
            .Select(e => new LDLAView
            {
                PassedTests = e.PassedTests,
                Status = e.Status,
            })
            .FirstOrDefaultAsync();
        var ldla = await _context.LocalDrivingLicenseApplications
            .Where(e => e.Id == id)
            .Select(e => new
            {
                e.Appointments,
            }).FirstOrDefaultAsync();
        if (PassedTests?.PassedTests == 0 && ldla?.Appointments!.Count == 0)
        {
            await _context.LocalDrivingLicenseApplications.Where(e => e.Id == id).ExecuteDeleteAsync();
            return true;
        }
        return false;
    }
    public IQueryable<LDLAView> LdlaPagination(GetPaginatedDataRequest Params, IQueryable<LDLAView> Query)
    {
        if (Params.OrderBy == EnOrderBy.asc)
            Query = Query.OrderBy(e => e.Id);
        else if (Params.OrderBy == EnOrderBy.desc)
            Query = Query.OrderByDescending(e => e.Id);

        Query = Query.Skip((Params.Page - 1) * Params.PageSize).Take(Params.PageSize)
            .Select(e => new LDLAView
            {
                Id = e.Id,
                FullName = e.FullName,
                NationalNo = e.NationalNo,
                ApplicationDate = e.ApplicationDate,
                DrivingClass = e.DrivingClass,
                PassedTests = e.PassedTests,
                Status = e.Status
            });
        return Query;
    }

    public IQueryable<LDLAView> GetLdlaQueryable()
    {
        return _context.LDLAView;
    }

    public async Task<bool> CancelLDLA(int LdlaId)
    {
        var entity = await _context.LocalDrivingLicenseApplications.Include(e => e.Application)
            .FirstOrDefaultAsync(e => e.Id == LdlaId);
        if (entity == null)
            return false;
        entity.Application.ApplicationStatus = EnApplicationStatus.Cancelled;
        entity.Application.LastStatusDate = DateTime.Now;
        return true;
    }

    public async Task<SingleLDLAResponse?> GetLDLAInfo(int LdlaId)
    {
        var result = await _context.LocalDrivingLicenseApplications
            .AsNoTracking()
            .Select(e => new SingleLDLAResponse()
            {
                Id = e.Id,
                ClassId = e.LicenseClassId,
                CreatorId = e.Application.CreatedByUserId,
                Date = e.Application.CreatedAt,
                Fees = e.Application.PaidFees,
                Person = e.Application.Person,
            }).FirstOrDefaultAsync(e => e.Id == LdlaId);
        if (result == null)
            return null;
        return result;
    }
    public async Task CreateApplication(Application application)
    {
        await _dbSet.AddAsync(application);
    }
    public async Task<bool> CompleteApplication(int Id)
    {
        var app = await _dbSet.FirstOrDefaultAsync(e => e.Id == Id);
        if (app == null)
            return false;
        app.LastStatusDate = DateTime.UtcNow;
        app.ApplicationStatus = EnApplicationStatus.Completed;
        return true;
    }

    public async Task<Person?> GetPerson(int ApplicationId)
    {
        return await _dbSet.Include(e => e.Person)
            .ThenInclude(e => e.Driver)
            .Select(e => e.Person)
            .FirstOrDefaultAsync(e => e.Id == ApplicationId);
    }
    public async Task UpdateLdlaLicenseClass(UpdateLdlaLicenseClassRequest details)
    {
        await _context.LocalDrivingLicenseApplications.Where(e => e.Id == details.Id)
            .ExecuteUpdateAsync(e => e.SetProperty(e => e.LicenseClassId, details.ClassId));
    }

    public async Task<bool> LdlaExists(int LdlaId)
    {
        var exists = await _dbSet.FirstOrDefaultAsync(e => e.Id == LdlaId);
        if (exists is null) return false;
        return true;
    }

    public async Task<int> CreateInternationLicenseApplication(int PersonId, int CreatedByUserId)
    {
        var AppType = await _context.ApplicationTypes.FirstAsync(e => e.ApplicationTypeId == 6);
        var Application = new Application
        {
            ApplicationTypeId = AppType.ApplicationTypeId,
            PaidFees = AppType.ApplicationTypeFees,
            ApplicationPersonId = PersonId,
            ApplicationStatus = EnApplicationStatus.New,
            CreatedAt = DateTime.Now,
            CreatedByUserId = CreatedByUserId,
            LastStatusDate = DateTime.Now,
        };
        _dbSet.Add(Application);
        await _context.SaveChangesAsync();
        return Application.Id;
    }

    public async Task<int> CreateRenewLicenseApplicationAsync(int PersonId, int CreatedByUserId)
    {
        var applicationType = await _context.ApplicationTypes.FirstOrDefaultAsync(e => e.ApplicationTypeId == 2);
        var application = new Application
        {
            ApplicationPersonId = PersonId,
            ApplicationStatus = EnApplicationStatus.New,
            LastStatusDate = DateTime.Now,
            PaidFees = applicationType!.ApplicationTypeFees,
            CreatedByUserId = CreatedByUserId,
            ApplicationTypeId = applicationType.ApplicationTypeId,
            CreatedAt = DateTime.Now,
        };
        await _dbSet.AddAsync(application);
        await _context.SaveChangesAsync();
        return application.Id;
    }

    public async Task<int> CreateReplaceLicenseApplicationAsync(int personId, int createdByUserId, int applicationTypeId)
    {
        var applicationType = await _context.ApplicationTypes
            .Where(e => e.ApplicationTypeId == applicationTypeId)
            .FirstOrDefaultAsync() ?? throw new ArgumentException("Invalid applicationTypeId");
        var app = new Application
        {
            ApplicationPersonId = personId,
            ApplicationStatus = EnApplicationStatus.New,
            LastStatusDate = DateTime.Now,
            ApplicationTypeId = applicationTypeId,
            CreatedAt = DateTime.Now,
            CreatedByUserId = createdByUserId,
            PaidFees = applicationType!.ApplicationTypeFees,
        };
        await _dbSet.AddAsync(app);
        await _context.SaveChangesAsync();
        return app.Id;
    }
}
