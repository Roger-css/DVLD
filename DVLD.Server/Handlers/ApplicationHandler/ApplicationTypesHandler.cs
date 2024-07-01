using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.ApplicationHandler
{
    public class ApplicationTypesHandler : BaseHandler<ApplicationTypesHandler>,
        IRequestHandler<GetApplicationTypesQuery, Result<IEnumerable<ApplicationType>>>
    {
        public ApplicationTypesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ApplicationTypesHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<IEnumerable<ApplicationType>>> Handle(GetApplicationTypesQuery request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.ApplicationRepository.GetAllTypes();
            if (result is null)
                return Result.Fail("Unexpected behavior");
            return Result.Ok(result);
        }
    }
}
