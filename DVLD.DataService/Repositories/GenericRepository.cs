
using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class GenericRepository<T> : IGenericRepository<T> where T : class
{
    public readonly ILogger Logger;
    protected DvldContext _context;
    protected DbSet<T> _values;

    public GenericRepository(ILogger logger, DvldContext context)
    {
        Logger = logger;
        _context = context;
        _values = context.Set<T>();
    }

    public virtual async Task<bool> Add(T entity)
    {
        throw new NotImplementedException();
    }

    public virtual async Task<bool> Delete(int id)
    {
        throw new NotSupportedException();
    }

    public virtual async Task<IEnumerable<T>> GetAll()
    {
        throw new NotImplementedException();
    }

    public virtual async Task<T> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public virtual async Task<bool> Update(T entity)
    {
        throw new NotImplementedException();
    }
}
