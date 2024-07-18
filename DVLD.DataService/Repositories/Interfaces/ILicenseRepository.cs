
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;

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
}
