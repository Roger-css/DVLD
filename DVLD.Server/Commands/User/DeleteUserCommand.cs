using FluentResults;
using MediatR;

namespace DVLD.Server.Commands
{
    public record DeleteUserCommand(int Id) : IRequest<Result<bool>>;
}
