using AutoMapper;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DVLD.Server.Handlers;
public class GetPaginatedLDLAHandler : BaseHandler<GetPaginatedLDLAHandler>, IRequestHandler<GetPaginatedLDLAQuery, PaginatedLDLA?>
{
    public GetPaginatedLDLAHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetPaginatedLDLAHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<PaginatedLDLA?> Handle(GetPaginatedLDLAQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ApplicationRepository.GetLdlaQueryable();
        PaginatedLDLA PaginatedPeople = new();
        if (!string.IsNullOrEmpty(request.Param.SearchTermKey))
        {
            query = query.HandleLDLASearch(request.Param.SearchTermKey!, request.Param.SearchTermValue!);
        }
        PaginatedPeople.Page = await HandlePages(query, request.Param.Page, request.Param.PageSize, cancellationToken);
        query = _unitOfWork.ApplicationRepository.LdlaPagination(request.Param, query);
        PaginatedPeople.AllLDLAs = await query.AsNoTracking().ToListAsync(cancellationToken);
        return PaginatedPeople;
    }

    public async Task<Pages> HandlePages(IQueryable<LDLAView> Query, int Page, int PageSize, CancellationToken cancellationToken)
    {
        var total = await Query.CountAsync(cancellationToken);
        return new Pages(total, Page, PageSize);
    }
}
