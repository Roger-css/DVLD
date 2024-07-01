using AutoMapper;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DVLD.Server.Handlers.ApplicationHandler;
public class GetPaginatedLDLAHandler : BaseHandler<GetPaginatedLDLAHandler>, IRequestHandler<GetPaginatedLDLAQuery, PaginatedEntity<LDLAView>?>
{
    public GetPaginatedLDLAHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetPaginatedLDLAHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<PaginatedEntity<LDLAView>?> Handle(GetPaginatedLDLAQuery request, CancellationToken cancellationToken)
    {
        var query = _unitOfWork.ApplicationRepository.GetLdlaQueryable();
        PaginatedEntity<LDLAView> PaginatedPeople = new();
        if (!string.IsNullOrEmpty(request.Param.SearchTermKey))
        {
            query = query.HandleLDLASearch(request.Param.SearchTermKey!, request.Param.SearchTermValue!);
        }
        PaginatedPeople.Page = await query.HandlePages(request.Param.Page, request.Param.PageSize, cancellationToken);
        query = _unitOfWork.ApplicationRepository.LdlaPagination(request.Param, query);
        PaginatedPeople.Collection = await query.AsNoTracking().ToListAsync(cancellationToken);
        return PaginatedPeople;
    }
}
