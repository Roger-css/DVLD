using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.UserHandler;

public class UpdateUserHandler : BaseHandler<UpdateUserHandler>, IRequestHandler<UpdateUserCommand, bool>
{
    public UpdateUserHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateUserHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            await _unitOfWork.UserRepository.UpdateUser(request.UserRequest);
            await _unitOfWork.CompleteAsync();
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError("wtf is wrong with update user handler? = {ex}", ex.Message);
            return false;
        }
    }
}
