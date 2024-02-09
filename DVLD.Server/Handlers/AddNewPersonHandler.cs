using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;
using System.Globalization;

namespace DVLD.Server.Handlers;

public class AddNewPersonHandler : BaseHandler, IRequestHandler<AddNewPersonQuery, bool>
{
    public AddNewPersonHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
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
