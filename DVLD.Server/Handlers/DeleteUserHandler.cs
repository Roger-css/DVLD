using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class DeleteUserHandler : BaseHandler<DeleteUserHandler>, IRequestHandler<DeleteUserQuery, bool>
{
    public DeleteUserHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DeleteUserHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(DeleteUserQuery request, CancellationToken cancellationToken)
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
