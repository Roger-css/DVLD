using DVLD.Server.Controllers;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands;

public record AddNewPersonCommand(PersonRequest Person) : IRequest<Result<bool>>;
