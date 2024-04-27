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
			_logger.LogError("{ex}",ex);
		}
		return false;
    }
    public async Task<IEnumerable<ApplicationType>> GetAllTypes()
    {
		return await _context.ApplicationTypes.ToListAsync();
    }
	public async Task<bool> DoesPersonHasLDLA(int PersonId, int classId)
	{
        var LDLAExist = await _context.LocalDrivingLicenseApplications
            .FirstOrDefaultAsync(e => e.Application.ApplicationPersonId == PersonId &&
            e.LicenseClassId == classId &&
            e.Application.ApplicationStatus != EnApplicationStatus.Cancelled);
        if(LDLAExist == null) return false;
        return true;
	}

    public async Task<Application> CreateApplication(ApplicationRequest Param)
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

    public IQueryable<LDLAView> LdlaPagination(GetAllLDLARequest Params, IQueryable<LDLAView> Query)
    {
        if (Params.OrderBy?.ToLower() == "asc")
            Query = Query.OrderBy(e => e.Id);
        else if (Params.OrderBy?.ToLower() == "desc")
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
        try
        {
            var entity = await _context.LocalDrivingLicenseApplications.Include(e => e.Application)
                .FirstOrDefaultAsync(e => e.Id == LdlaId);
            if (entity == null)
                return false;
            entity.Application.ApplicationStatus = EnApplicationStatus.Cancelled;
            entity.Application.LastStatusDate = DateTime.Now;
            return true;
        }
        catch (Exception)
        {
            return false;
            throw;
        }
    }

    public async Task<SingleLDLAResponse?> GetLDLAInfo(int LdlaId)
    {
        var result = await _context.LocalDrivingLicenseApplications.AsNoTracking().Select(e => new SingleLDLAResponse()
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
}
