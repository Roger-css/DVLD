using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler
{
    public class GetDetainedLicensesHandler : BaseHandler<GetDetainedLicensesHandler>, IRequestHandler<GetDetainedLicensesQuery, Result<PaginatedEntity<DetainedLicensesView>>>
    {
        public GetDetainedLicensesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetDetainedLicensesHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<PaginatedEntity<DetainedLicensesView>>> Handle(GetDetainedLicensesQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.LicenseRepository.GetDetainedLicenses(request.RequestFilters);
        }
    }
}
