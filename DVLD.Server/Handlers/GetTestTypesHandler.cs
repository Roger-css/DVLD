using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers
{
    public class GetTestTypesHandler : BaseHandler<GetTestTypesHandler>, IRequestHandler<GetTestTypesQuery, IEnumerable<TestType>>
    {
        public GetTestTypesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetTestTypesHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public Task<IEnumerable<TestType>> Handle(GetTestTypesQuery request, CancellationToken cancellationToken)
        {
            return _unitOfWork.TestRepository.GetAllTestTypes();
        }
    }
}
