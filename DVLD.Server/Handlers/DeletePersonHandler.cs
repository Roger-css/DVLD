using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class DeletePersonHandler : BaseHandler<DeletePersonHandler>, IRequestHandler<DeletePersonQuery, bool>
{
    public DeletePersonHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DeletePersonHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(DeletePersonQuery request, CancellationToken cancellationToken)
    {
        var Deleted = await _unitOfWork.PersonRepository.DeletePerson(request.Id);
        if (!Deleted)
            return false;
        await _unitOfWork.CompleteAsync();
        return true;
    }
}
