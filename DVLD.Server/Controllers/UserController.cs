using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DVLD.Server.Controllers
{
    public class UserController : BaseController
    {
        public UserController(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest user)
        {
            if(!ModelState.IsValid)
                return BadRequest();
            try
            {
                var MappedUser = _mapper.Map<User>(user);
                var login = await _unitOfWork.UserRepository.Login(MappedUser);
                if (login)
                    return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Unauthorized();
        }

    }
}
