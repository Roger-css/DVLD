using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.UserHandler;

public class DeleteUserHandler : BaseHandler<DeleteUserHandler>, IRequestHandler<DeleteUserCommand, Result<bool>>
{
    public DeleteUserHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DeleteUserHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<bool>> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.UserRepository.DeleteUser(request.Id);
        await _unitOfWork.CompleteAsync();
        return Result.Ok(result);
    }
}
