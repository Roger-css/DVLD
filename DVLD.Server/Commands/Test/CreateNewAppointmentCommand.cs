using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands;

public record CreateNewAppointmentCommand(CreateAppointmentRequest Entity) : IRequest<Result<int>>;
