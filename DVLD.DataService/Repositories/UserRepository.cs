using DVLD.DataService.Data;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Linq;

namespace DVLD.DataService.Repositories;

internal class UserRepository : GenericRepository<User>, IUserRepository
{
     public UserRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }
    public async Task<User?> Login(User entity)
    {
        try
        {
            var result = await _dbSet.Where(e =>
            e.UserName == entity.UserName &&
            e.Password == entity.Password &&
            e.IsActive == true)
                .Select(e => new User { Person = e.Person, Id = e.Id, UserName = e.UserName, IsActive = e.IsActive })
                .FirstOrDefaultAsync();
            if (result is null)
                return null;
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error in method {nameof(Login)} in {nameof(UserRepository)}");
            throw new Exception("userRepo login method",ex);
        }
    }

    public async Task<User?> GetUserInfo(string searchTerm, string searchValue)
    {
        try
        {
            return await SearchTerm(_dbSet, searchTerm, searchValue).Select(e => new User()
            {
                Id = e.Id,
                UserName = e.UserName,
                IsActive = e.IsActive,
                Person = e.Person,
                Password = e.Password,
                PersonId = e.PersonId,
            }).FirstOrDefaultAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError("{ex} occoured in {name} while trying to fetch the user info of the " +
                "searchTerm = {st} , searchValue = {sv}",
                ex.Message, nameof(GetUserInfo), searchTerm, searchValue);
            return null;
        }
    }

    private static IQueryable<User> SearchTerm(IQueryable<User>query, string term, string value)
    {
        switch (term.ToLower())
        {
            case "personid":
                return query.Where(e => e.PersonId == int.Parse(value));
            case "id":
                return query.Where(e => e.Id == int.Parse(value));
            case "isactive":
                var EnIsActive = (EnStatus) Enum.Parse(typeof(EnStatus), value);
                if (EnIsActive == EnStatus.all)
                    return query;
                bool isActive = EnIsActive == EnStatus.Active;
                return query.Where(e => e.IsActive == isActive);
            case "fullname":
                return query.Where(e => (e.Person!.FirstName + " " + e.Person.SecondName + " " +
                    e.Person.ThirdName + " " + e.Person.LastName).Contains(value));
            case "username":
                return query.Where(e => e.UserName.Contains(value));
            default:
                return query;
        }
    }

    public async Task<IEnumerable<User>?> GetFilteredUsers(SearchRequest @params)
    {
        IQueryable<User> query = _dbSet;

        if (!(string.IsNullOrWhiteSpace(@params.SearchTermKey) || string.IsNullOrWhiteSpace(@params.SearchTermValue)))
            query = SearchTerm(query, @params.SearchTermKey, @params.SearchTermValue);

        return await query.Include(e => e.Person).ToListAsync();
    }

    public async Task<bool> DeleteUser(int id)
    {
        return await _dbSet.Where(e => e.Id == id).ExecuteDeleteAsync() > 0;
    }

    public async Task<bool> UpdateUser(CreateUserRequest @params)
    {
        var entity = await _dbSet.FirstOrDefaultAsync(e => e.PersonId == @params.Id);
        if (entity == null)
        {
            return false;
        }
        entity.UserName = @params.UserName;
        entity.Password = @params.Password;
        entity.IsActive = @params.IsActive;
        return true;
    }

    public async Task<bool> CheckPassword(string password, int Id)
    {
        return await _dbSet.Where(e => e.Password == password && e.Id == Id).FirstOrDefaultAsync() != null;
    }
}
