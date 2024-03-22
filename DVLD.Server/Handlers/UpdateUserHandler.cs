using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class UpdateUserHandler : BaseHandler<UpdateUserHandler>, IRequestHandler<UpdateUserQuery, bool>
{
    public UpdateUserHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateUserHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(UpdateUserQuery request, CancellationToken cancellationToken)
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
