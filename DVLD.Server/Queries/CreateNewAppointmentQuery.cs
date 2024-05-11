using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;

public record CreateNewAppointmentQuery(CreateAppointmentRequest entity) : IRequest<int>;
