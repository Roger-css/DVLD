using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.TestHandler
{
    public class GetTestTypesHandler : BaseHandler<GetTestTypesHandler>, IRequestHandler<GetTestTypesQuery, Result<IEnumerable<TestType>>>
    {
        public GetTestTypesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetTestTypesHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<IEnumerable<TestType>>> Handle(GetTestTypesQuery request, CancellationToken cancellationToken)
        {
            var entities = await _unitOfWork.TestRepository.GetAllTestTypes();
            if (entities is not null)
                return Result.Ok(entities)!;
            return Result.Fail("No Types Found");
        }
    }
}
