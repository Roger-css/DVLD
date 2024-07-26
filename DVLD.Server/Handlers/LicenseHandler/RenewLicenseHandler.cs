using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Commands.License;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler;

public class RenewLicenseHandler : BaseHandler<RenewLicenseHandler>, IRequestHandler<RenewLicenseCommand, Result<NewLicenseResponse>>
{
    public RenewLicenseHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<RenewLicenseHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }
    public async Task<Result<NewLicenseResponse>> Handle(RenewLicenseCommand request, CancellationToken cancellationToken)
    {
        if (!await _unitOfWork.LicenseRepository.IsLicenseExpired(request.LicenseId))
            return Result.Fail("License Hasn't Expired");
        if (!await _unitOfWork.LicenseRepository.IsActiveLicense(request.LicenseId))
            return Result.Fail("InActive Licence");
        if (await _unitOfWork.LicenseRepository.IsDetainedLicense(request.LicenseId))
            return Result.Fail("Detained License");
        var driver = await _unitOfWork.LicenseRepository.GetDriverByLocalLicenseId(request.LicenseId);
        if (driver == null)
            return Result.Fail("Invalid license. This license doesn't exist");
        int applicationId = await _unitOfWork.ApplicationRepository
            .CreateRenewLicenseApplicationAsync(driver!.PersonId, request.CreatedByUserId);
        int newLicenseId = await _unitOfWork.LicenseRepository.RenewLicenseAndUnActivateOldLicenseAsync(
            request.LicenseId,
            applicationId,
            request.CreatedByUserId,
            driver.Id,
            request.Notes
            );
        return new NewLicenseResponse(newLicenseId, applicationId);
    }
}
