using DVLD.Server.Controllers;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdatePersonCommand(PersonRequest Person) : IRequest<bool>;
