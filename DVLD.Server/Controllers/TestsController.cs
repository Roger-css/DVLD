using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Commands;
using DVLD.Server.Common.Extensions;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers;
[Authorize]
public class TestsController : BaseController<TestsController>
{
    public TestsController(IUnitOfWork unitOfWork, IMediator mediator, ILogger<TestsController> logger) : base(unitOfWork, mediator, logger)
    {
    }
    [Route("Types")]
    [HttpGet()]
    public async Task<IActionResult> GetTestTypes()
    {
        var query = new GetTestTypesQuery();
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }
        return StatusCode(500, result.ToErrorMessages());
    }
    [Route("Types")]
    [HttpPut()]
    public async Task<IActionResult> UpdateTestType(TestType test)
    {
        var query = new UpdateTestTypeCommand(test);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
        {
            return Ok();
        }
        return BadRequest(result.ToErrorMessages());
    }
    [Route("Appointments/{typeId}/{id}")]
    [HttpGet()]
    public async Task<IActionResult> GetLdlaWithAppointments([FromRoute] int typeId, [FromRoute] int id)
    {
        var query = new GetLdlaWithAppointmentsQuery(id, typeId);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
        {
            return Ok(result.Value);
        }
        return NotFound(result.ToErrorMessages());
    }
    [Route("Appointments")]
    [HttpPost()]
    public async Task<IActionResult> CreateNewAppointmentForLdla([FromBody] CreateAppointmentRequest entity)
    {
        var query = new CreateNewAppointmentCommand(entity);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok(result.Value);
        return BadRequest(result.ToErrorMessages());
    }
    [Route("")]
    [HttpPost()]
    public async Task<IActionResult> CreateNewTest([FromBody] CreateTestRequest entity)
    {
        var query = new CreateNewTestCommand(entity);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok(result.Value);
        return BadRequest(result.ToErrorMessages());
    }
    [Route("Appointments")]
    [HttpPut()]
    public async Task<IActionResult> UpdateTestAppointment([FromBody] UpdateAppointmentRequest entity)
    {
        var query = new UpdateTestAppointmentCommand(entity);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok();
        return BadRequest(result.ToErrorMessages());
    }
}
