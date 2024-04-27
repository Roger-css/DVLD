using DVLD.DataService.Data;
using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories.Interfaces;

internal class LicenseRepository : GenericRepository<License>, ILicenseRepository
{
    public LicenseRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }

    public async Task<IEnumerable<LicenseClass>?> GetLicenseClasses()
    {
        return await _context.LicenseClasses.ToListAsync();
    }
}
