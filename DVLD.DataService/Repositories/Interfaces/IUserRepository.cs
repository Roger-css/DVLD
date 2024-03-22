using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
namespace DVLD.DataService.Repositories.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    public Task<User?> Login(User entity);
    public Task<bool> UpdateUser(CreateUserRequest @params);
    public Task<bool> DeleteUser(int id);
    public Task<User?> GetUserInfo(string st, string sv);
    public Task<IEnumerable<User>?> GetFilteredUsers(SearchRequest @params);
    public Task<bool> CheckPassword(string password, int Id);
}
