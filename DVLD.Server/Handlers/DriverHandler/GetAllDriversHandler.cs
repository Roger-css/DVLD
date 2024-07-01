using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;
namespace DVLD.Server.Handlers.DriverHandler
{
    public class GetAllDriversHandler : BaseHandler<GetAllDriversHandler>, IRequestHandler<GetAllDriversQuery, Result<PaginatedEntity<DriversView>>>
    {
        public GetAllDriversHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllDriversHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<PaginatedEntity<DriversView>>> Handle(GetAllDriversQuery request, CancellationToken cancellationToken)
        {
            var PaginatedDrivers = new PaginatedEntity<DriversView>
            {
                Collection = await _unitOfWork.DriverRepository.GetAllDrivers(request.Search),
                Page = await _unitOfWork.DriverRepository
                    .GetPaginatedDriversPages(request.Search.Page, request.Search.PageSize),
            };
            return PaginatedDrivers;
        }
    }
}
