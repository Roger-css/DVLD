
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;

namespace DVLD.DataService.Repositories.Interfaces;

public interface ILicenseRepository
{
    public Task<IEnumerable<LicenseClass>?> GetLicenseClasses();
    public Task<License> IssueLicenceFirstTime(IssueDrivingLicenseFirstTimeRequest request, int driverId); 
}
