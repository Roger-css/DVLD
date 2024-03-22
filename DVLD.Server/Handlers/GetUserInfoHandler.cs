using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class GetUserInfoHandler : BaseHandler<GetUserInfoHandler>, IRequestHandler<GetUserInfoQuery, User?>
{
    public GetUserInfoHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetUserInfoHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<User?> Handle(GetUserInfoQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.UserRepository.GetUserInfo(request.Params.SearchTermKey!, request.Params.SearchTermValue!);
    }
}
