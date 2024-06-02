using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.PersonHandler;

public class DeletePersonHandler : BaseHandler<DeletePersonHandler>, IRequestHandler<DeletePersonCommand, Result>
{
    public DeletePersonHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DeletePersonHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result> Handle(DeletePersonCommand request, CancellationToken cancellationToken)
    {
        var Deleted = await _unitOfWork.PersonRepository.DeletePerson(request.Id);
        if (!Deleted)
            return Result.Fail("Not Found");
        await _unitOfWork.CompleteAsync();
        return Result.Ok();
    }
}
