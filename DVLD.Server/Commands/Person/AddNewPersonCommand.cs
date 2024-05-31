using DVLD.Server.Controllers;
using MediatR;

namespace DVLD.Server.Commands;

public record AddNewPersonCommand(PersonRequest Person) : IRequest<bool>;
