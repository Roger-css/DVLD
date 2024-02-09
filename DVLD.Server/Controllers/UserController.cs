using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers
{
    public class UserController : BaseController
    {
        public UserController(IUnitOfWork unitOfWork, IMapper mapper,IMediator mediator ) : base(unitOfWork, mapper,mediator)
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
                var query = new LoginQuery(user);
                var login = await _mediator.Send(query);
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
