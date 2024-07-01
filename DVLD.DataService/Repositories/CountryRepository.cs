

using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class CountryRepository : GenericRepository<Country>, ICountryRepository
{
    public CountryRepository(ILogger logger, DvldContext context) : base(logger, context) { }

    public async Task<bool> IsValidCountryId(int countryId)
    {
        var exists = await _dbSet.FirstOrDefaultAsync(e => e.Id == countryId);
        if (exists is not null)
            return true;
        return false;
    }
}
