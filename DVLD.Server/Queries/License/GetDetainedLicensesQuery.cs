﻿using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries
{
    public record GetDetainedLicensesQuery(GetPaginatedDataRequest RequestFilters) : IRequest<Result<PaginatedEntity<DetainedLicensesView>>>;
}
