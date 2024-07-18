using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.PersonHandler;

public class GetPersonDetailsHandler : BaseHandler<GetPersonDetailsHandler>, IRequestHandler<GetPersonQuery, Result<Person?>>
{
    public GetPersonDetailsHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetPersonDetailsHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<Person?>> Handle(GetPersonQuery request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.PersonRepository.GetPersonBySearchParams(request.Params);
        if (entity is null)
            return Result.Fail("DB returned Null");
        return entity;
    }
}
