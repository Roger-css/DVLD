using DVLD.Entities.DbSets;

namespace DVLD.DataService.Repositories.Interfaces;

public interface ICountryRepository
{
    Task<IEnumerable<Country>?> GetAll();
    Task<bool> IsValidCountryId(int  countryId);
}
