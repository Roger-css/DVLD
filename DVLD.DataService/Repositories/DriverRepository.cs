
using DVLD.DataService.Data;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class DriverRepository : GenericRepository<Driver>, IDriverRepository
{
    public DriverRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }

    public async Task<IEnumerable<DriversView>?> GetAllDrivers(GetPaginatedDataRequest search)
    {
        IQueryable<DriversView>? drivers = _context.DriversView;

        if (!(string.IsNullOrWhiteSpace(search.SearchTermKey) &&
            string.IsNullOrWhiteSpace(search.SearchTermValue)))
            drivers = drivers.HandleDriversSearch(search.SearchTermKey!, search.SearchTermValue!);
        if (drivers is null)
            return null;
        if (search.OrderBy is not null)
            drivers = drivers.BasicSorting(search.OrderBy);
        return await drivers.HandlePagination(search.Page, search.PageSize)
            .ToListAsync();
    }

    public Task<Pages> GetPaginatedDriversPages(int page, int pageSize)
    {
        return _context.DriversView.HandlePages(page, pageSize);
    }
}
