using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Commands;
using DVLD.Server.Common.Extensions;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static DVLD.DataService.Helpers.ErrorMessages;

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
        if (result.IsSuccess)
            return Ok(result.Value);
        return StatusCode(500, "server error");
    }
    [HttpPost()]
    [Route("IssueLicense")]
    public async Task<IActionResult> IssueLicenseFirstTime([FromBody] IssueDrivingLicenseFirstTimeRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest();
        var query = new IssueLicenseCommand(request);
        var result = await _mediator.Send(query);
        if (result != -1)
        {
            return Ok(result);
        }
        return StatusCode(500, "server error");
    }
    [HttpGet()]
    [Route("Local/{appId}")]
    public async Task<IActionResult> GetLocalLicenseInfo(int appId)
    {
        var query = new GetLocalLicenseInfoQuery(appId);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok(result.Value);
        return NotFound(result.ToErrorMessages());
    }
    [HttpGet]
    [Route("Local/All/{id}")]
    public async Task<IActionResult> GetLocalLicenses(int id)
    {
        var query = new GetLocalLicensesQuery(id);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok(result.Value);
        return BadRequest(result.ToErrorMessages());
    }
    [HttpPost]
    [Route("international")]
    public async Task<IActionResult> CreateInternationalLicense(NewInternationalLicenseCommand command)
    {
        var result = await _mediator.Send(command);
        if (result.IsSuccess)
            return Ok(new
            {
                LicenseId = result.Value.Item1,
                ApplicationId = result.Value.Item2
            });
        else if (result.Reasons.Any(e => e.Message == LicenseAlreadyInternational))
            return Conflict(result.ToErrorMessages());
        return StatusCode(StatusCodes.Status500InternalServerError, result.ToErrorMessages());
    }
    [HttpGet]
    [Route("international/application/{Id}")]
    public async Task<IActionResult> GetApplicationId([FromRoute] int Id)
    {
        var result = await _unitOfWork.LicenseRepository.GetApplicationId(Id);
        if (result is null)
            return NotFound();
        return Ok(result.Value);
    }
}
