using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public record GetAllCountriesQuery : IRequest<Result<IEnumerable<AllCountriesResponse>?>>;