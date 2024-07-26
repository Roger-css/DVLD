using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public record GetPaginatedIntLicensesQuery(GetPaginatedDataRequest Req) :
    IRequest<Result<PaginatedEntity<InternationalDrivingLicense>>>;
