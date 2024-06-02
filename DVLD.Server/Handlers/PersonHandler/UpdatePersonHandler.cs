using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.PersonHandler
{
    public class UpdatePersonHandler : BaseHandler<UpdatePersonHandler>, IRequestHandler<UpdatePersonCommand, Result<bool>>
    {
        public UpdatePersonHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdatePersonHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<bool>> Handle(UpdatePersonCommand request, CancellationToken cancellationToken)
        {
            var entity = _mapper.Map<Person>(request.Person);
            var isValid = await _unitOfWork.PersonRepository.UpdatePerson(entity);
            if (!isValid)
                return Result.Fail("");
            await _unitOfWork.CompleteAsync();

            return true;
        }
    }
}
