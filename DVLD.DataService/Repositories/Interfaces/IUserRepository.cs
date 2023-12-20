using DVLD.Entities.DbSets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.DataService.Repositories.Interfaces;

public interface IUserRepository : IGenericRepository<User>
{
    public Task<bool> Login(User entity);
    public Task<bool> UpdatePassword(User entity);
    public Task<bool> DeActivateUser(int id);
}
