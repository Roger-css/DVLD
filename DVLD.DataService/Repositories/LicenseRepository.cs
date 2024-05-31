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
}
