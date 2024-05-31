using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.UserHandler;

public class DeleteUserHandler : BaseHandler<DeleteUserHandler>, IRequestHandler<DeleteUserCommand, bool>
{
    public DeleteUserHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DeleteUserHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await _unitOfWork.UserRepository.DeleteUser(request.Id);
            await _unitOfWork.CompleteAsync();
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError("error at delete user handler = {}", ex.Message);
            return false;
        }

    }
}
