using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.UserHandler;

public class CheckPasswordHandler : BaseHandler<CheckPasswordHandler>, IRequestHandler<CheckPasswordQuery, Result<bool>>
{
    public CheckPasswordHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<CheckPasswordHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<bool>> Handle(CheckPasswordQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.UserRepository.CheckPassword(request.Password, request.Id);
        if (result)
        {
            return true;
        }
        return Result.Fail("Password Incorrect");
    }
}
