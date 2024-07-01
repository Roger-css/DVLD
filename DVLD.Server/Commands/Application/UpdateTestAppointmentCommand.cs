using DVLD.Entities.Dtos.Request;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdateTestAppointmentCommand(UpdateAppointmentRequest TestRequest) : IRequest<Result<bool>>;
