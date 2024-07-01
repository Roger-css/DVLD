using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;

namespace DVLD.DataService.Repositories.Interfaces;

public interface IDriverRepository : IGenericRepository<Driver>
{
    public Task<IEnumerable<DriversView>?> GetAllDrivers(GetPaginatedDataRequest search);
    public Task<Pages> GetPaginatedDriversPages(int page, int pageSize);
}
