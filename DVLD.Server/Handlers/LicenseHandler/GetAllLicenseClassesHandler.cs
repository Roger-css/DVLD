using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler;

public class GetAllLicenseClassesHandler : BaseHandler<GetAllLicenseClassesHandler>, IRequestHandler<GetAllLicenseClassesQuery, Result<IEnumerable<LicenseClass>?>>
{
    public GetAllLicenseClassesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllLicenseClassesHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<IEnumerable<LicenseClass>?>> Handle(GetAllLicenseClassesQuery request, CancellationToken cancellationToken)
    {
        return Result.Ok(await _unitOfWork.LicenseRepository.GetLicenseClasses());
    }
}
