using AutoMapper;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DVLD.Server.Handlers.PersonHandler;

public class GetAllPeopleHandler : BaseHandler<GetAllPeopleHandler>, IRequestHandler<GetAllPeopleQuery, Result<PaginatedEntity<AllPeopleResponse>>>
{
    public GetAllPeopleHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllPeopleHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<PaginatedEntity<AllPeopleResponse>>> Handle(GetAllPeopleQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.PersonRepository.GetQueryable();
        PaginatedEntity<AllPeopleResponse> paginatedPeople = new();
        if (!string.IsNullOrEmpty(request.Params.SearchTermKey))
        {
            query = query.HandlePersonSearch(request.Params.SearchTermKey!, request.Params.SearchTermValue!);
        }
        if (!string.IsNullOrEmpty(request.Params.Gender.ToString()))
        {
            query = query.Where(e => e.Gender == request.Params.Gender);
        }
        paginatedPeople.Page = await HandlePages(query, request.Params.Page, request.Params.PageSize, cancellationToken);
        query = _unitOfWork.PersonRepository.Pagination(request.Params, query);
        paginatedPeople.Collection = _mapper.Map<IEnumerable<AllPeopleResponse>>(await query.AsNoTracking().ToListAsync(cancellationToken));
        return Result.Ok(paginatedPeople);
    }

    public async Task<Pages> HandlePages(IQueryable<Person> query, int page, int pageSize, CancellationToken cancellationToken)
    {
        var total = await query.CountAsync(cancellationToken);
        return new Pages(total, page, pageSize);
    }
}
