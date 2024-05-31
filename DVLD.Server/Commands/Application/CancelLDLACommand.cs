using MediatR;

namespace DVLD.Server.Commands;

public record CancelLDLACommand(int Id) : IRequest<bool>;
