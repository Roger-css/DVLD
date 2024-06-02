using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.PersonHandler;

public class AddNewPersonHandler : BaseHandler<AddNewPersonHandler>, IRequestHandler<AddNewPersonCommand, Result<bool>>
{
    public AddNewPersonHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<AddNewPersonHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<bool>> Handle(AddNewPersonCommand request, CancellationToken cancellationToken)
    {

        Person MappedEntity = _mapper.Map<Person>(request.Person);
        await _unitOfWork.PersonRepository.Add(MappedEntity);
        await _unitOfWork.CompleteAsync();
        return Result.Ok();
    }
}
