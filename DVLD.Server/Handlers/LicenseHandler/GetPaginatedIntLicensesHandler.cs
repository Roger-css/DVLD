using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler;

public class GetPaginatedIntLicensesHandler : BaseHandler<GetPaginatedIntLicensesHandler>,
    IRequestHandler<GetPaginatedIntLicensesQuery, Result<PaginatedEntity<InternationalDrivingLicense>>>
{
    public GetPaginatedIntLicensesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetPaginatedIntLicensesHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<PaginatedEntity<InternationalDrivingLicense>>> Handle(GetPaginatedIntLicensesQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.LicenseRepository
            .GetPaginatedInternationalLicensesAsync(request.Req);
    }
}
