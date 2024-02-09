using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Enums;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace DVLD.Server.Handlers;

public class GetAllPeopleHandler : BaseHandler, IRequestHandler<GetAllPeopleQuery, PaginatedPeople>
{
    public GetAllPeopleHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
    }

    public async Task<PaginatedPeople> Handle(GetAllPeopleQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.PersonRepository.GetQueryable();
        PaginatedPeople PaginatedPeople = new();
        if (!string.IsNullOrEmpty(request.Params.SearchTermKey))
        {
            query = HandleSearch(query, request.Params.SearchTermKey!, request.Params.SearchTermValue!);
        }
        if (request.Params.Gender != null)
        {
            query = query.Where(e => e.Gender == request.Params.Gender);
        }
        PaginatedPeople.Page = await HandlePages(query, request.Params.Page, request.Params.PageSize, cancellationToken);
        query = _unitOfWork.PersonRepository.Pagination(request.Params, query);
        PaginatedPeople.AllPeople = _mapper.Map<IEnumerable<AllPeopleResponse>>(await query.ToListAsync(cancellationToken));
        return PaginatedPeople;
    }
    public IQueryable<Person> HandleSearch(IQueryable<Person> query, string key, string value)
    {
        switch (key.ToLower())
        {
            case "id":
                return query.Where(e => e.Id == Convert.ToInt32(value));
            case "name":
                return query.Where(e => (e.FirstName + e.SecondName + e.ThirdName + e.LastName).Contains(value));
            case "phone":
                return query.Where(e => e.Phone.Contains(value));
            case "nationalno":
                return query.Where(e => e.NationalNo.Contains(value));
            case "email":
                return query.Where(e => e.Email!.Contains(value));
            default: return query;
        }
    }
    public async Task<Pages> HandlePages(IQueryable<Person> Query, int Page, int PageSize, CancellationToken cancellationToken)
    {
        var total = await Query.CountAsync(cancellationToken);
        return new Pages(total, Page, PageSize);
    }
}
