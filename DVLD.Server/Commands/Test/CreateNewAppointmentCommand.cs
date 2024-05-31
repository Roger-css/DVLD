using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Commands;

public record CreateNewAppointmentCommand(CreateAppointmentRequest entity) : IRequest<int>;
