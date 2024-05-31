using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.PersonHandler;

public class DeletePersonHandler : BaseHandler<DeletePersonHandler>, IRequestHandler<DeletePersonCommand, bool>
{
    public DeletePersonHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DeletePersonHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(DeletePersonCommand request, CancellationToken cancellationToken)
    {
        var Deleted = await _unitOfWork.PersonRepository.DeletePerson(request.Id);
        if (!Deleted)
            return false;
        await _unitOfWork.CompleteAsync();
        return true;
    }
}
