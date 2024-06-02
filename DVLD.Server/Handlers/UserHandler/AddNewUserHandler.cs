using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.UserHandler;

public class AddNewUserHandler : BaseHandler<AddNewUserHandler>, IRequestHandler<AddNewUserCommand, Result>
{
    public AddNewUserHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<AddNewUserHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result> Handle(AddNewUserCommand request, CancellationToken cancellationToken)
    {
        var entity = new User()
        {
            PersonId = request.Params.Id,
            UserName = request.Params.UserName,
            Password = request.Params.Password,
            IsActive = request.Params.IsActive
        };
        await _unitOfWork.UserRepository.Add(entity);
        await _unitOfWork.CompleteAsync();
        return Result.Ok();
    }
}
