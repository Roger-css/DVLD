using FluentResults;
using MediatR;

namespace DVLD.Server.Commands
{
    public record DeleteLdlaCommand(int Id) : IRequest<Result>;
}
