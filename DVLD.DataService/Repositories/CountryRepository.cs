

using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class CountryRepository : GenericRepository<Country>, ICountryRepository
{
    public CountryRepository(ILogger logger, DvldContext context) : base(logger, context) { }
}
