using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.CountryHandler;

public class GetAllCountriesHandler : BaseHandler<GetAllCountriesHandler>, IRequestHandler<GetAllCountriesQuery, Result<IEnumerable<AllCountriesResponse>?>>
{
    public GetAllCountriesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllCountriesHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<IEnumerable<AllCountriesResponse>?>> Handle(GetAllCountriesQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.CountryRepository.GetAll();
        if (result is null)
            return Result.Fail("DataBase returned Null");
        var MappedResult = _mapper.Map<IEnumerable<AllCountriesResponse>>(result);
        return Result.Ok(MappedResult)!;
    }
}
