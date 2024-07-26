
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Enums;

namespace DVLD.DataService.Repositories.Interfaces;

public interface ILicenseRepository
{
    public Task<IEnumerable<LicenseClass>?> GetLicenseClasses();
    public Task<License> IssueLicenceFirstTime(IssueDrivingLicenseFirstTimeRequest request, int driverId);
    public Task<License?> GetLocalLicenseInfo(int applicationId);
    public Task<IEnumerable<License>?> GetLocalLicensesAsync(int id);
    public Task<int> CreateInternationalLicense(int localLicenseId, int applicationId, int createdByUserId, int driverId);
    public Task<Driver?> GetDriverByLocalLicenseId(int licenseId);
    public Task<bool> DoesLocalLicenseIdAlreadyInternational(int licenseId);
    public Task<int?> GetApplicationId(int licenseId);
    public Task<int> RenewLicenseAndUnActivateOldLicenseAsync(int oldLicenseId, int applicationId, int createdByUserId, int driverId, string notes);
    public Task<bool> IsLicenseExpired(int licenseId);
    public Task<bool> IsActiveLicense(int licenseId);
    public Task<bool> IsDetainedLicense(int licenseId);
    public Task<IEnumerable<InternationalDrivingLicense>> GetInternationalLicensesAsync(int personId);
    public Task<PaginatedEntity<InternationalDrivingLicense>> GetPaginatedInternationalLicensesAsync
        (GetPaginatedDataRequest options);
    public Task<int> CreateReplacedLicenseAsync(int oldLicenseId, int applicationId, EnIssueReason reason);
}
