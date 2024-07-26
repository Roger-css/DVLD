using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;
using static DVLD.DataService.Helpers.ErrorMessages;
namespace DVLD.Server.Handlers.LicenseHandler;

public class NewInternationalLicenseHandler : BaseHandler<NewInternationalLicenseHandler>,
    IRequestHandler<NewInternationalLicenseCommand, Result<(int, int)>>
{
    public NewInternationalLicenseHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<NewInternationalLicenseHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<(int, int)>> Handle(NewInternationalLicenseCommand request, CancellationToken cancellationToken)
    {
        if (await _unitOfWork.LicenseRepository.DoesLocalLicenseIdAlreadyInternational(request.LicenseId))
            return Result.Fail(LicenseAlreadyInternational);
        var driver = await _unitOfWork.LicenseRepository.GetDriverByLocalLicenseId(request.LicenseId);
        if (driver is null)
            return Result.Fail(InvalidLicenseId);
        var applicationId = await _unitOfWork.ApplicationRepository
            .CreateInternationLicenseApplication(driver.Person!.Id, request.CreatedByUserId);
        var internationalLicenseId = await _unitOfWork.LicenseRepository
            .CreateInternationalLicense(request.LicenseId, applicationId, request.CreatedByUserId, driver.Id);
        return (internationalLicenseId, applicationId);
    }
}
