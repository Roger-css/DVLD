using AutoMapper;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DVLD.Server.Handlers.PersonHandler;

public class GetAllPeopleHandler : BaseHandler<GetAllPeopleHandler>, IRequestHandler<GetAllPeopleQuery, PaginatedPeople>
{
    public GetAllPeopleHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllPeopleHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<PaginatedPeople> Handle(GetAllPeopleQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.PersonRepository.GetQueryable();
        PaginatedPeople PaginatedPeople = new();
        if (!string.IsNullOrEmpty(request.Params.SearchTermKey))
        {
            query = query.HandlePersonSearch(request.Params.SearchTermKey!, request.Params.SearchTermValue!);
        }
        if (!string.IsNullOrEmpty(request.Params.Gender.ToString()))
        {
            query = query.Where(e => e.Gender == request.Params.Gender);
        }
        PaginatedPeople.Page = await HandlePages(query, request.Params.Page, request.Params.PageSize, cancellationToken);
        query = _unitOfWork.PersonRepository.Pagination(request.Params, query);
        PaginatedPeople.AllPeople = _mapper.Map<IEnumerable<AllPeopleResponse>>(await query.AsNoTracking().ToListAsync(cancellationToken));
        return PaginatedPeople;
    }

    public async Task<Pages> HandlePages(IQueryable<Person> Query, int Page, int PageSize, CancellationToken cancellationToken)
    {
        var total = await Query.CountAsync(cancellationToken);
        return new Pages(total, Page, PageSize);
    }
}
