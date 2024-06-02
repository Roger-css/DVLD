using DVLD.Server.Controllers;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdatePersonCommand(PersonRequest Person) : IRequest<Result<bool>>;
