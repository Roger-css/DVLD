using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Commands;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers;
[Authorize]
public class LicenseController : BaseController<LicenseController>
{
    public LicenseController(IUnitOfWork unitOfWork, IMediator mediator, ILogger<LicenseController> logger) : base(unitOfWork, mediator, logger)
    {
    }
    [HttpGet()]
    [Route("classes")]
    public async Task<IActionResult> GetClasses()
    {
        var query = new GetAllLicenseClassesQuery();
        var result = await _mediator.Send(query);
        if (result != null)
        {
            return Ok(result);
        }
        return StatusCode(500,"server error");
    }
    [HttpPost()]
    [Route("IssueLicense")]
    public async Task<IActionResult> IssueLicenseFirstTime([FromBody] IssueDrivingLicenseFirstTimeRequest request)
    {
        if(!ModelState.IsValid) 
            return BadRequest();
        var query = new IssueLicenseCommand(request);
        var result = await _mediator.Send(query);
        if (result != -1)
        {
            return Ok(result);
        }
        return StatusCode(500, "server error");
    }
}
