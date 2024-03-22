
using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly ILogger _logger;
    protected readonly DvldContext _context;
    protected readonly DbSet<T> _dbSet;

    public GenericRepository(ILogger logger, DvldContext context)
    {
        _logger = logger;
        _context = context;
        _dbSet = context.Set<T>();
    }

    public virtual async Task<bool> Add(T entity)
    {
        await _dbSet.AddAsync(entity);
        return true;
    }

    public virtual async Task<IEnumerable<T>?> GetAll()
    {
        return await _dbSet.AsNoTracking().ToListAsync();
    }

    public virtual async Task<T?> GetById(int id)
    {
        return await _dbSet.FindAsync(id);
    }

}
