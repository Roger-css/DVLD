using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Enums;
using DVLD.Server.Commands.License;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler
{
    public class ReplaceLicenseHandler : BaseHandler<ReplaceLicenseHandler>, IRequestHandler<ReplaceLicenseCommand, Result<NewLicenseResponse>>
    {
        public ReplaceLicenseHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ReplaceLicenseHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<NewLicenseResponse>> Handle(ReplaceLicenseCommand request, CancellationToken cancellationToken)
        {
            var driver = await _unitOfWork.LicenseRepository.GetDriverByLocalLicenseId(request.LicenseId);
            if (driver == null)
                return Result.Fail("Invalid License Id");
            if (await _unitOfWork.LicenseRepository.IsLicenseExpired(request.LicenseId))
                return Result.Fail("License Expired");
            if (!await _unitOfWork.LicenseRepository.IsActiveLicense(request.LicenseId))
                return Result.Fail("InActive License");
            var applicationId = await _unitOfWork.ApplicationRepository.CreateReplaceLicenseApplicationAsync
                (driver.PersonId, request.CreatedByUserId, request.ReasonType);
            EnIssueReason IssueReason = (EnIssueReason)Enum.Parse(typeof(EnIssueReason), request.ReasonType.ToString());
            var newLicenseId = await _unitOfWork.LicenseRepository.CreateReplacedLicenseAsync
                (request.LicenseId, applicationId, IssueReason);
            return new NewLicenseResponse(newLicenseId, applicationId);
        }
    }
}
