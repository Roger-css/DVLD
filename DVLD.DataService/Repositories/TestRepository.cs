
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

    public async Task<bool> UpdateTestType(TestType test)
    {
        var entity = await _context.TestTypes.FirstOrDefaultAsync(e => e.Id == test.Id);
        if (entity == null)
            return false;
        entity.TestTypeTitle = test.TestTypeTitle;
        entity.TestTypeDescription = test.TestTypeDescription;
        entity.TestTypeFees = test.TestTypeFees;
        return true;
    }
}
