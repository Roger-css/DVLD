
using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class TestRepository : GenericRepository<TestAppointment>, ITestRepository
{
    public TestRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }

    public async Task<IEnumerable<TestType>> GetAllTestTypes()
    {
        return await _context.TestTypes.ToListAsync();
    }
}
