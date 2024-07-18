using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler;

public class GetLicenseInfoHandler : BaseHandler<GetLicenseInfoHandler>, IRequestHandler<GetLocalLicenseInfoQuery, Result<LocalLicenseInfoResponse>>
{
    public GetLicenseInfoHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetLicenseInfoHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<LocalLicenseInfoResponse>> Handle(GetLocalLicenseInfoQuery request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.LicenseRepository.GetLocalLicenseInfo(request.Id);
        if (entity == null)
        {
            return Result.Fail("Application ID does not exist");
        }
        var mappedEntity = _mapper.Map<LocalLicenseInfoResponse>(entity);
        return mappedEntity;
    }
}
