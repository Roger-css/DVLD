using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers
{
    public class LoginHandler : BaseHandler<LoginHandler>, IRequestHandler<LoginQuery, User?>
    {
        public LoginHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<LoginHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<User?> Handle(LoginQuery request, CancellationToken cancellationToken)
        {

            try
            {
                var MappedUser = _mapper.Map<User>(request.user);
                var login = await _unitOfWork.UserRepository.Login(MappedUser);
                if (login == null)
                    return null;
                return login;
            }
            catch (Exception)
            {
                throw new Exception("login failed");
            }
        }
    }
}
