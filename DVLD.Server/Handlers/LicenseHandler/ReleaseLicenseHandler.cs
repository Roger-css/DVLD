using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands.License;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler
{
    public class ReleaseLicenseHandler : BaseHandler<ReleaseLicenseHandler>, IRequestHandler<ReleaseLicenseCommand, Result<int>>
    {
        public ReleaseLicenseHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ReleaseLicenseHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<int>> Handle(ReleaseLicenseCommand request, CancellationToken cancellationToken)
        {
            using var transaction = await _unitOfWork.BeginTransactionAsync();
            try
            {
                var applicationId = await _unitOfWork.ApplicationRepository
                    .CreateReleaseDetainLicenseApplication(request.LicenseId, request.UserId);
                await _unitOfWork.LicenseRepository
                    .ReleaseLicense(request.LicenseId, applicationId, request.UserId);
                await _unitOfWork.CompleteAsync();
                await transaction.CommitAsync(cancellationToken);
                return applicationId;
            }
            catch (Exception ex)
            {
                _logger.LogError("{ex}", ex);
                await transaction.RollbackAsync(cancellationToken);
                return Result.Fail("something went wrong");
            }
        }
    }
}
