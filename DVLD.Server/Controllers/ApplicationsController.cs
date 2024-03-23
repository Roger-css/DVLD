using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers
{
    public class ApplicationsController : BaseController<ApplicationsController>
    {
        public ApplicationsController(IUnitOfWork unitOfWork, IMediator mediator, ILogger<ApplicationsController> logger) : base(unitOfWork, mediator, logger)
        {
        }
        [HttpGet]
        [Route("types")]
        public async Task<IActionResult> GetApplicationTypes()
        {
            var query = new GetApplicationTypesQuery();
            var result = await _mediator.Send(query);
            if(result != null) 
                return Ok(result);
            return StatusCode(500, new { Error = "Idk man ur server crashed look logs" });
        }
        [HttpPut]
        [Route("types/Update")]
        public async Task<IActionResult> UpdateAppType([FromBody] ApplicationType entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid credentials", error = ModelState.ToList() });
            }
            var query = new UpdateApplicationTypeQuery(entity);
            var result = await _mediator.Send(query);
            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
