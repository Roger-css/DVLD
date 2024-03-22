using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class AddNewUserHandler : BaseHandler<AddNewUserHandler>, IRequestHandler<AddNewUserQuery, bool>
{
    public AddNewUserHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<AddNewUserHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(AddNewUserQuery request, CancellationToken cancellationToken)
    {
        var entity = new User()
        {
            PersonId = request.Params.Id,
            UserName = request.Params.UserName,
            Password = request.Params.Password,
            IsActive = request.Params.IsActive
        };
        var result = await _unitOfWork.UserRepository.Add(entity);
        if (result)
            await _unitOfWork.CompleteAsync();
        return result;
    }
}
