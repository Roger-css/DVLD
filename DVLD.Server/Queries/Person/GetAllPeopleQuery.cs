using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public record GetAllPeopleQuery(GetAllPeopleRequest Params) : IRequest<Result<PaginatedEntity<AllPeopleResponse>>>;
