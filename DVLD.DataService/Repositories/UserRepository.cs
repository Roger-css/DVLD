using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.DataService.Repositories;

internal class UserRepository : GenericRepository<User>, IUserRepository
{
    public UserRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }
    public async Task<bool> UpdatePassword(User entity)
    {
        try
        {
            var toUpdate =  await _dbSet.FirstOrDefaultAsync(e => e.Id == entity.Id);
            if (toUpdate == null)
                return false;
            toUpdate.Password = entity.Password;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, $"Error in method {nameof(UpdatePassword)} in {nameof(UserRepository)}");
            throw;
        }
        return true;
    }
    public async Task<bool> DeActivateUser(int id)
    {
        try
        {
            var toUpdate = await _dbSet.FirstOrDefaultAsync(e => e.Id == id);
            if (toUpdate == null)
                return false;
            toUpdate.IsActive = false;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, $"Error in method {nameof(UpdatePassword)} in {nameof(UserRepository)}");
            throw;
        }
        return true;
    }
    public async Task<bool> Login(User entity)
    {
        try
        {
            var result = await _dbSet.Where(e => e.UserName == entity.UserName && e.Password == entity.Password)
                .FirstOrDefaultAsync();
            if (result == null)
                return false;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, $"Error in method {nameof(Login)} in {nameof(UserRepository)}");
            throw;
        }
        return true;
    }
}
