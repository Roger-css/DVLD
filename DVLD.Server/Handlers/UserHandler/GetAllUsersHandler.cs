using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.UserHandler;

public class GetAllUsersHandler : BaseHandler<GetAllUsersHandler>, IRequestHandler<GetAllUsersQuery, Result<IEnumerable<LessUserInfoResponse>?>>
{
    public GetAllUsersHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllUsersHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<IEnumerable<LessUserInfoResponse>?>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.UserRepository.GetFilteredUsers(request.Params);
        if (result is null)
            return Result.Fail("DB returned Null");
        var Mapped = _mapper.Map<IEnumerable<LessUserInfoResponse>>(result);
        return Result.Ok(Mapped)!;
    }
}
