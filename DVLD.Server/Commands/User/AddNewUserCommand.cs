using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Commands;
public record AddNewUserCommand(CreateUserRequest Params) : IRequest<bool>;
