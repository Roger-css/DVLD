using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;
public class AddNewUserQuery: IRequest<bool>
{
    public CreateUserRequest Params { get; set; }
    public AddNewUserQuery(CreateUserRequest @params)
    {
        Params = @params;
    }

}
