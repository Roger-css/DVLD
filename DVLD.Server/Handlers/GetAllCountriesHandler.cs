using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class GetAllCountriesHandler : BaseHandler, IRequestHandler<GetAllCountriesQuery, IEnumerable<Country>>
{
    public GetAllCountriesHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public Task<IEnumerable<Country>> Handle(GetAllCountriesQuery request, CancellationToken cancellationToken)
    {
        throw new Exception();
    }
}
