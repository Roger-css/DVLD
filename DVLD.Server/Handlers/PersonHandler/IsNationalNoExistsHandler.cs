using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.PersonHandler
{
    public class IsNationalNoExistsHandler : BaseHandler<IsNationalNoExistsHandler>, IRequestHandler<IsNationalNoExistsQuery, Result<bool>>
    {
        public IsNationalNoExistsHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<IsNationalNoExistsHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<bool>> Handle(IsNationalNoExistsQuery request, CancellationToken cancellationToken)
        {
            var exists = await _unitOfWork.PersonRepository.IsNationalNoExist(request.NationalNo);
            if (exists)

                return Result.Ok(exists);
            return Result.Fail("Doesn't Exists");
        }
    }
}
