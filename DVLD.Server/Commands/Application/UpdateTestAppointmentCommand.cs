using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdateTestAppointmentCommand(UpdateAppointmentRequest TestRequest) : IRequest<bool>;
