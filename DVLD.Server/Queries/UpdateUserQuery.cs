using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;

public class UpdateUserQuery: IRequest<bool>
{
    public CreateUserRequest UserRequest { get; set; }
    public UpdateUserQuery(CreateUserRequest userRequest)
    {
        UserRequest = userRequest;
    }
}
