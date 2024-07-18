using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Common.Extensions;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers;
[Authorize]
public class DriverController : BaseController<DriverController>
{
    public DriverController(IUnitOfWork unitOfWork, IMediator mediator, ILogger<DriverController> logger) : base(unitOfWork, mediator, logger)
    {
    }
    [HttpGet]
    [Route("All")]
    public async Task<IActionResult> GetAllDrivers([FromQuery] GetPaginatedDataRequest search)
    {
        var query = new GetAllDriversQuery(search);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok(result.Value);
        return BadRequest(result.ToErrorMessages());
    }
}
