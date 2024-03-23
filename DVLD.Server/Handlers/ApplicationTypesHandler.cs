using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers
{
    public class ApplicationTypesHandler : BaseHandler<ApplicationTypesHandler>,
        IRequestHandler<GetApplicationTypesQuery, IEnumerable<ApplicationType>?>
    {
        public ApplicationTypesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ApplicationTypesHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<IEnumerable<ApplicationType>?> Handle(GetApplicationTypesQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.ApplicationRepository.GetAll();
        }
    }
}
