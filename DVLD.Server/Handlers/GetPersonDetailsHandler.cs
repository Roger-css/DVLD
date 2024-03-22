using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class GetPersonDetailsHandler : BaseHandler<GetPersonDetailsHandler>, IRequestHandler<GetPersonQuery, Person?>
{
    public GetPersonDetailsHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetPersonDetailsHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Person?> Handle(GetPersonQuery request, CancellationToken cancellationToken)
    {
        var Entity = await _unitOfWork.PersonRepository.GetPersonBySearchParams(request.Params);
        if (Entity == null)
            return null;
        return Entity;
    }
}
