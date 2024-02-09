using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers
{
    public class LoginHandler : BaseHandler, IRequestHandler<LoginQuery,bool>
    {
        public LoginHandler(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        public async Task<bool> Handle(LoginQuery request, CancellationToken cancellationToken)
        {

            try
            {
                var MappedUser = _mapper.Map<User>(request.user);
                var login = await _unitOfWork.UserRepository.Login(MappedUser);
                if (login)
                    return true;
            }
            catch (Exception)
            {
            }
            return false;
        }
    }
}
