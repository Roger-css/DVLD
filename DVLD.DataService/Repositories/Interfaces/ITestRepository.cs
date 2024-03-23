

using DVLD.Entities.DbSets;

namespace DVLD.DataService.Repositories.Interfaces;

public interface ITestRepository:IGenericRepository<TestAppointment>
{
    public Task<IEnumerable<TestType>> GetAllTestTypes();
}
