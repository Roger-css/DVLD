using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.UserHandler
{
    public class LoginHandler : BaseHandler<LoginHandler>, IRequestHandler<LoginQuery, Result<User?>>
    {
        public LoginHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<LoginHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<User?>> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            var MappedUser = _mapper.Map<User>(request.user);
            var login = await _unitOfWork.UserRepository.Login(MappedUser);
            if (login is null)
                return Result.Fail("");

            return Result.Ok(login)!;
    }
    }
}
