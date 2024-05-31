using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using MediatR;
using System.Linq.Expressions;

namespace DVLD.Server.Handlers.ApplicationHandler;

public class GetSingleLDLAHandler : BaseHandler<GetSingleLDLAHandler>,
    IRequestHandler<GetSingleLDLAQuery, SingleLDLAResponse?>
{
    public GetSingleLDLAHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetSingleLDLAHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<SingleLDLAResponse?> Handle(GetSingleLDLAQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.ApplicationRepository.GetLDLAInfo(request.Id);
    }
}
