using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands.License;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler
{
    public class DetainLicenseHandler : BaseHandler<DetainLicenseHandler>, IRequestHandler<DetainLicenseCommand, Result<int>>
    {
        public DetainLicenseHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DetainLicenseHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<int>> Handle(DetainLicenseCommand request, CancellationToken cancellationToken)
        {
            if (await _unitOfWork.LicenseRepository.GetById(request.LicenseId) is null)
                return Result.Fail("Invalid license id");
            if (await _unitOfWork.LicenseRepository.IsDetainedLicense(request.LicenseId))
                return Result.Fail("License already detained");
            if (!await _unitOfWork.LicenseRepository.IsActiveLicense(request.LicenseId))
                return Result.Fail("InActive license");
            return await _unitOfWork.LicenseRepository.DetainLicense(request.LicenseId,
                request.CreatedByUserId, request.Fees);
        }
    }
}
