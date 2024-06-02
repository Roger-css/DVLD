using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.UserHandler;

public class UpdateUserHandler : BaseHandler<UpdateUserHandler>, IRequestHandler<UpdateUserCommand, Result>
{
    public UpdateUserHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateUserHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        await _unitOfWork.UserRepository.UpdateUser(request.UserRequest);
        await _unitOfWork.CompleteAsync();
        return Result.Ok();
    }
}
