using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
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
            .Where(e => e.Application.LocalDrivingLicenseApplication!.Id == applicationId)
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
}
