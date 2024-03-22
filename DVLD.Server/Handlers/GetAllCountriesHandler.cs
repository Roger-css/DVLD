using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class GetAllCountriesHandler : BaseHandler<GetAllCountriesHandler>, IRequestHandler<GetAllCountriesQuery, IEnumerable<AllCountriesResponse>?>
{
    public GetAllCountriesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllCountriesHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<IEnumerable<AllCountriesResponse>?> Handle(GetAllCountriesQuery request, CancellationToken cancellationToken)
    {
        var Result = await _unitOfWork.CountryRepository.GetAll();
        var MappedResult = _mapper.Map<IEnumerable<AllCountriesResponse>>(Result);
        return MappedResult;
    }
}
