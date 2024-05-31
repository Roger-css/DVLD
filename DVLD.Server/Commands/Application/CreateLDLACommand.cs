using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Commands;

public record CreateLDLACommand(CreateLDLARequest Param) : IRequest<int>;
