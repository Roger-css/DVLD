using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class CancelLDLAHandler : BaseHandler<CancelLDLAHandler>, IRequestHandler<CancelLDLAQuery, bool>
{
    public CancelLDLAHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<CancelLDLAHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(CancelLDLAQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.ApplicationRepository.CancelLDLA(request.Id);
        await _unitOfWork.CompleteAsync();
        return result;
    }
}
