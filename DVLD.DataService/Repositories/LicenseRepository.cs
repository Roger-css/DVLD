using DVLD.DataService.Data;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class LicenseRepository : GenericRepository<License>, ILicenseRepository
{
    public LicenseRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }

    public async Task<IEnumerable<LicenseClass>?> GetLicenseClasses()
    {
        return await _context.LicenseClasses.ToListAsync();
    }

    public async Task<License?> GetLocalLicenseInfo(int applicationId)
    {
        var entity = await _dbSet.AsNoTracking()
            .Where(e => e.ApplicationId == applicationId)
            .Select(e => new License
            {
                Id = e.Id,
                DriverId = e.DriverId,
                ExpirationDate = e.ExpirationDate,
                IssueDate = e.IssueDate,
                IsActive = e.IsActive,
                IssueReason = e.IssueReason,
                Notes = e.Notes,
                LicenseClass = new LicenseClass
                {
                    ClassName = e.LicenseClass.ClassName,
                },
                Driver = new Driver
                {
                    Person = new Person
                    {
                        FirstName = e.Driver.Person!.FirstName,
                        SecondName = e.Driver.Person.SecondName,
                        ThirdName = e.Driver.Person.ThirdName,
                        LastName = e.Driver.Person.LastName,
                        Gender = e.Driver.Person.Gender,
                        BirthDate = e.Driver.Person.BirthDate,
                        NationalNo = e.Driver.Person.NationalNo,
                        Image = e.Driver.Person.Image,
                    }
                },
                DetainedLicense = e.DetainedLicense!.Where(e => !e.IsReleased).ToList(),
            })
            .FirstOrDefaultAsync();
        return entity;
    }

    public async Task<License> IssueLicenceFirstTime(IssueDrivingLicenseFirstTimeRequest request, int driverId)
    {
        var licenseClass = await _context.Applications.Include(e => e.LocalDrivingLicenseApplication)
            .ThenInclude(e => e.LicenseClass)
            .FirstOrDefaultAsync(e => e.Id == request.ApplicationId);
        var license = new License()
        {
            ApplicationId = request.ApplicationId,
            CreatedByUserId = request.CreatedByUserId,
            IsActive = true,
            ExpirationDate = DateTime.UtcNow
            .AddYears(licenseClass!.LocalDrivingLicenseApplication!.LicenseClass.DefaultValidityLength),
            IssueDate = DateTime.UtcNow,
            IssueReason = Entities.Enums.EnIssueReason.FirstTime,
            Notes = request.Notes,
            PaidFees = licenseClass.LocalDrivingLicenseApplication.LicenseClass.ClassFees,
            LicenseClassId = licenseClass.Id,
            DriverId = driverId
        };
        await _dbSet.AddAsync(license);
        return license;
    }
    public async Task<IEnumerable<License>?> GetLocalLicensesAsync(int id)
    {
        return await _dbSet.Where(e => e.Driver.Person!.Id == id)
            .Select(e => new License
            {
                Id = e.Id,
                ApplicationId = e.ApplicationId,
                LicenseClass = new LicenseClass
                {
                    ClassName = e.LicenseClass.ClassName
                },
                IssueDate = e.IssueDate,
                ExpirationDate = e.ExpirationDate,
                IsActive = e.IsActive,
            }).ToListAsync();
    }

    public async Task<int> CreateInternationalLicense(int localLicenseId, int applicationId, int createdByUserId, int driverId)
    {
        var License = new InternationalDrivingLicense
        {
            ApplicationId = applicationId,
            CreatedByUserId = createdByUserId,
            DriverId = driverId,
            ExpirationDate = DateTime.UtcNow.AddYears(1),
            IsActive = true,
            IssueDate = DateTime.UtcNow,
            IssueUsingLocalDrivingLicenseId = localLicenseId,
        };

        _context.InternationalDrivingLicenses.Add(License);
        await _context.SaveChangesAsync();
        return License.Id;
    }

    public async Task<Driver?> GetDriverByLocalLicenseId(int licenseId)
    {
        return await _dbSet.Where(e => e.Id == licenseId).Select(e => new Driver
        {
            Id = e.DriverId,
            PersonId = e.Driver.PersonId,
            Person = new Person
            {
                Id = e.Driver.PersonId
            }
        }).FirstOrDefaultAsync();
    }

    public async Task<bool> DoesLocalLicenseIdAlreadyInternational(int licenseId)
    {
        return await _context.InternationalDrivingLicenses.Where(e => e.Id != licenseId).FirstOrDefaultAsync() is not null;
    }

    public async Task<int?> GetApplicationId(int licenseId)
    {
        var result = await _dbSet.Where(e => e.Id == licenseId).FirstOrDefaultAsync();
        return result?.ApplicationId;
    }

    public async Task<int> RenewLicenseAndUnActivateOldLicenseAsync(int oldLicenseId, int applicationId, int createdByUserId, int driverId, string notes)
    {
        var oldLicense = await _dbSet.Where(e => e.Id == oldLicenseId)
            .FirstOrDefaultAsync() ?? throw new ArgumentException($"{oldLicenseId} was invalid licenseId");
        oldLicense.IsActive = false;
        var license = new License
        {
            CreatedByUserId = createdByUserId,
            ApplicationId = applicationId,
            IssueDate = DateTime.Now,
            ExpirationDate = DateTime.Now.AddYears(10),
            DriverId = driverId,
            IsActive = true,
            IssueReason = EnIssueReason.Renew,
            LicenseClassId = oldLicense!.LicenseClassId,
            Notes = notes,
            PaidFees = oldLicense.PaidFees, // You need to check this
        };
        await _dbSet.AddAsync(license);
        await _context.SaveChangesAsync();
        return license.Id;
    }

    public async Task<bool> IsLicenseExpired(int licenseId)
    {
        var entity = await _dbSet.Where(e => e.Id == licenseId)
            .Select(e => new
            {
                e.IsActive,
                e.ExpirationDate
            })
            .FirstOrDefaultAsync();
        return !entity!.IsActive || entity.ExpirationDate <= DateTime.Now;
    }

    public async Task<IEnumerable<InternationalDrivingLicense>> GetInternationalLicensesAsync(int personId)
    {
        var result = await _context.InternationalDrivingLicenses
            .Where(e => e.Driver.PersonId == personId)
            .Select(e => new InternationalDrivingLicense
            {
                Id = personId,
                ApplicationId = e.ApplicationId,
                IssueDate = e.IssueDate,
                ExpirationDate = e.ExpirationDate,
                IssueUsingLocalDrivingLicenseId = e.IssueUsingLocalDrivingLicenseId,
                IsActive = e.IsActive,
            }).ToListAsync();
        return result;
    }

    public async Task<PaginatedEntity<InternationalDrivingLicense>> GetPaginatedInternationalLicensesAsync
        (GetPaginatedDataRequest options)
    {
        var result = new PaginatedEntity<InternationalDrivingLicense>();
        IQueryable<InternationalDrivingLicense>? query = _context.InternationalDrivingLicenses;
        if (!(string.IsNullOrEmpty(options.SearchTermKey) || string.IsNullOrEmpty(options.SearchTermValue)))
            query = query.HandleIntLicensesSearch(options.SearchTermKey, options.SearchTermValue);
        if (query == null)
            return PaginatedEntity<InternationalDrivingLicense>.NoEntities();
        query = query.BasicSorting(options.OrderBy);
        result.Page = await query.HandlePages(options.Page, options.PageSize);
        result.Collection = await query.HandlePagination(options.Page, options.PageSize).ToListAsync();
        result.Collection = result.Collection.Select(e => new InternationalDrivingLicense
        {
            ApplicationId = e.ApplicationId,
            DriverId = e.DriverId,
            ExpirationDate = e.ExpirationDate,
            IsActive = e.IsActive,
            IssueUsingLocalDrivingLicenseId = e.IssueUsingLocalDrivingLicenseId,
            Id = e.Id,
            IssueDate = e.IssueDate,
        });
        return result;
    }

    public async Task<bool> IsActiveLicense(int licenseId)
    {
        return await _dbSet.Where(e => e.Id == licenseId).Select(e => e.IsActive).FirstOrDefaultAsync();
    }
    public async Task<bool> IsDetainedLicense(int licenseId)
    {
        var entity = await _context.DetainedLicenses.Where(e => e.Id == licenseId).FirstOrDefaultAsync();
        if (entity is not null)
            return !entity.IsReleased;
        return false;
    }

    public async Task<int> CreateReplacedLicenseAsync(int oldLicenseId, int applicationId, EnIssueReason reason)
    {
        var oldLicense = await _dbSet
            .Where(e => e.Id == oldLicenseId)
            .FirstOrDefaultAsync();
        oldLicense!.IsActive = false;
        var newLicenseApplication = await _context.Applications
            .Where(e => e.Id == applicationId)
            .FirstOrDefaultAsync();
        var newLicense = new License
        {
            ApplicationId = applicationId,
            CreatedByUserId = newLicenseApplication!.CreatedByUserId,
            DriverId = oldLicense.DriverId,
            ExpirationDate = oldLicense.ExpirationDate,
            IsActive = true,
            IssueDate = DateTime.Now,
            IssueReason = reason,
            PaidFees = 0,
            LicenseClassId = oldLicense.LicenseClassId,
        };
        await _dbSet.AddAsync(newLicense);
        await _context.SaveChangesAsync();
        return newLicense.Id;
    }
}
