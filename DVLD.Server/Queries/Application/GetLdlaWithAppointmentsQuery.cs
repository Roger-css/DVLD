using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public record GetLdlaWithAppointmentsQuery(int Id, int TypeId) : IRequest<Result<LdlaDetailsWithAppointments>>;
