using DVLD.Entities.Dtos.Request;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands;
public record AddNewUserCommand(CreateUserRequest Params) : IRequest<Result>;
