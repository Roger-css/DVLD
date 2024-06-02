using FluentResults;
using MediatR;

namespace DVLD.Server.Commands;

public record DeletePersonCommand(int Id) : IRequest<Result>;
