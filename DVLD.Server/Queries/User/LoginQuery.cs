using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;

public class LoginQuery : IRequest<User?>
{
    public LoginQuery(UserLoginRequest user)
    {
        this.user = user;
    }

    public UserLoginRequest user { get; set; }

}