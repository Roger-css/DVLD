using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.ApplicationHandler;

public class CancelLDLAHandler : BaseHandler<CancelLDLAHandler>, IRequestHandler<CancelLDLACommand, bool>
{
    public CancelLDLAHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<CancelLDLAHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(CancelLDLACommand request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.ApplicationRepository.CancelLDLA(request.Id);
        await _unitOfWork.CompleteAsync();
        return result;
    }
}
