using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.ApplicationHandler;

public class UpdateLdlaLicenseClassHandler : BaseHandler<UpdateLdlaLicenseClassHandler>, IRequestHandler<UpdateLdlaLicenseClassCommand>
{
    public UpdateLdlaLicenseClassHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateLdlaLicenseClassHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task Handle(UpdateLdlaLicenseClassCommand request, CancellationToken cancellationToken)
    {
        await _unitOfWork.ApplicationRepository.UpdateLdlaLicenseClass(request.details);
    }
}
