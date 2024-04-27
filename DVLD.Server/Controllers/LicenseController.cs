using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers;

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
}
