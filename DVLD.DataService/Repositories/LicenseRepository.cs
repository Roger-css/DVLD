using DVLD.DataService.Data;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Enums;
using DVLD.Entities.Views;
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
            .Where(l => l.ApplicationId == applicationId)
            .Select(l => new License
            {
                Id = l.Id,
                DriverId = l.DriverId,
                ExpirationDate = l.ExpirationDate,
                IssueDate = l.IssueDate,
                IsActive = l.IsActive,
                IssueReason = l.IssueReason,
                Notes = l.Notes,
                LicenseClass = new LicenseClass
                {
                    ClassName = l.LicenseClass.ClassName,
                },
                Driver = new Driver
                {
                    Person = new Person
                    {
                        FirstName = l.Driver.Person!.FirstName,
                        SecondName = l.Driver.Person.SecondName,
                        ThirdName = l.Driver.Person.ThirdName,
                        LastName = l.Driver.Person.LastName,
                        Gender = l.Driver.Person.Gender,
                        BirthDate = l.Driver.Person.BirthDate,
                        NationalNo = l.Driver.Person.NationalNo,
                        Image = l.Driver.Person.Image,
                    }
                },
                DetainedLicense = l.DetainedLicense!.Where(d => d.LicenseId == l.Id).Where(d => !d.IsReleased).ToList(),
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
        var entity = await _context.DetainedLicenses
            .Where(e => e.LicenseId == licenseId && !e.IsReleased)
            .FirstOrDefaultAsync();
        if (entity is not null)
            return true;
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

    public async Task<int> DetainLicense(int licenseId, int createdBy, float fees)
    {
        var detainInfo = new DetainedLicense
        {
            CreatedByUserId = createdBy,
            DetainDate = DateTime.Now,
            FineFees = fees,
            LicenseId = licenseId,
            IsReleased = false,
        };
        await _context.DetainedLicenses.AddAsync(detainInfo);
        await _context.SaveChangesAsync();
        return detainInfo.Id;
    }

    public async Task<DetainedLicense> GetDetainInfo(int licenseId)
    {
        var entity = await _context.DetainedLicenses.Where(e => e.LicenseId == licenseId)
            .Select(e => new DetainedLicense
            {
                Id = e.Id,
                LicenseId = e.LicenseId,
                CreateUser = new User
                {
                    UserName = e.CreateUser.UserName,
                },
                DetainDate = e.DetainDate,
                FineFees = e.FineFees,
            })
            .FirstOrDefaultAsync();
        return entity!;
    }

    public async Task ReleaseLicense(int licenseId, int applicationId, int createdByUserId)
    {
        await _context.DetainedLicenses.Where(e => e.LicenseId == licenseId).ExecuteUpdateAsync(e =>
            e.SetProperty(e => e.IsReleased, true)
            .SetProperty(e => e.ReleasedByUserId, createdByUserId)
            .SetProperty(e => e.ReleaseApplicationId, applicationId)
            .SetProperty(e => e.ReleaseDate, DateTime.Now)
            );
        await _context.SaveChangesAsync();
    }
    public async Task<PaginatedEntity<DetainedLicensesView>> GetDetainedLicenses(GetPaginatedDataRequest search)
    {
        var result = new PaginatedEntity<DetainedLicensesView>();
        IQueryable<DetainedLicensesView>? query = _context.DetainedLicensesView;
        if (!(string.IsNullOrEmpty(search.SearchTermKey) || string.IsNullOrEmpty(search.SearchTermValue)))
            query = query.HandleDetainedLicensesSearch(search.SearchTermKey, search.SearchTermValue);
        if (query == null)
            return PaginatedEntity<DetainedLicensesView>.NoEntities();
        query = query.BasicSorting(search.OrderBy);
        result.Page = await query.HandlePages(search.Page, search.PageSize);
        result.Collection = await query.HandlePagination(search.Page, search.PageSize).ToListAsync();
        return result;
    }
}
