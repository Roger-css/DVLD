using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler;

public class GetInternationalLicensesHandler : BaseHandler<GetInternationalLicensesHandler>,
    IRequestHandler<GetInternationalLicensesQuery, Result<IEnumerable<InternationalDrivingLicense>>>
{
    public GetInternationalLicensesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetInternationalLicensesHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<IEnumerable<InternationalDrivingLicense>>> Handle(GetInternationalLicensesQuery request, CancellationToken cancellationToken)
    {
        var licenses = await _unitOfWork.LicenseRepository.GetInternationalLicensesAsync(request.Id);
        return Result.Ok(licenses!);
    }
}
