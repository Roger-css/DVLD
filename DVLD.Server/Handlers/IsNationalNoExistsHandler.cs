using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers
{
    public class IsNationalNoExistsHandler : BaseHandler, IRequestHandler<IsNationalNoExistsQuery, bool>
    {
        public IsNationalNoExistsHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public async Task<bool> Handle(IsNationalNoExistsQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.PersonRepository.IsNationalNoExist(request.NationalNo);
        }
    }
}
