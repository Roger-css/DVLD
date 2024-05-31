using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdateUserCommand(CreateUserRequest UserRequest) : IRequest<bool>;
