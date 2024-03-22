using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers
{
    public class IsNationalNoExistsHandler : BaseHandler<IsNationalNoExistsHandler>, IRequestHandler<IsNationalNoExistsQuery, bool>
    {
        public IsNationalNoExistsHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<IsNationalNoExistsHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<bool> Handle(IsNationalNoExistsQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.PersonRepository.IsNationalNoExist(request.NationalNo);
        }
    }
}
