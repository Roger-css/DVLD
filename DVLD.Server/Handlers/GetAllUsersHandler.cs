using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class GetAllUsersHandler : BaseHandler<GetAllUsersHandler>, IRequestHandler<GetAllUsersQuery, IEnumerable<LessUserInfoResponse>?>
{
    public GetAllUsersHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllUsersHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<IEnumerable<LessUserInfoResponse>?> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var Result = await _unitOfWork.UserRepository.GetFilteredUsers(request.Params);
        var Mapped = _mapper.Map<IEnumerable<LessUserInfoResponse>>(Result);
        return Mapped;
    }
}
