using MediatR;

namespace DVLD.Server.Commands;

public record DeletePersonCommand(int Id) : IRequest<bool>;
