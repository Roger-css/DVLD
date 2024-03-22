using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class AddNewPersonHandler : BaseHandler<AddNewPersonHandler>, IRequestHandler<AddNewPersonQuery, bool>
{
    public AddNewPersonHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<AddNewPersonHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(AddNewPersonQuery request, CancellationToken cancellationToken)
    {

        var MappedEntity = _mapper.Map<Person>(request.Person);
        bool result = await _unitOfWork.PersonRepository.Add(MappedEntity);
        await _unitOfWork.CompleteAsync(); 
        return result;
    }
}
