
using DVLD.Entities.DbSets;

namespace DVLD.DataService.Repositories.Interfaces;

public interface ILicenseRepository
{
    public Task<IEnumerable<LicenseClass>?> GetLicenseClasses();
}
