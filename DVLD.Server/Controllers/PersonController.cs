using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Enums;
using DVLD.Server.Commands;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers;
[Authorize]
public class PersonController : BaseController<PersonController>
{
    public PersonController(IUnitOfWork unitOfWork, IMediator mediator, ILogger<PersonController> logger) : base(unitOfWork, mediator, logger)
    {
    }
    [HttpPost()]
    [Route("Get")]
    public async Task<IActionResult> GetPersonDetails([FromBody] SearchRequest @params)
    {
        var query = new GetPersonQuery(@params);
        var result = await _mediator.Send(query);
        if(result.IsSuccess)
            return Ok(result.Value);
        return NotFound();
    }
    [HttpGet()]
    [Route("nationalNo/{NationalNo}")]
    public async Task<IActionResult> IsNationalNoExists([FromRoute] string NationalNo)
    {
        var query = new IsNationalNoExistsQuery(NationalNo);
        var result = await _mediator.Send(query);
        if(result.IsSuccess) return Ok();
        return NotFound();
    }
    [HttpPost()]
    [Route("")]
    public async Task<IActionResult> GetAllPeople([FromBody] GetAllPeopleRequest Params)
    {
        var query = new GetAllPeopleQuery(Params);
        var result = await _mediator.Send(query);
        return result != null ? Ok(result) : NotFound();
    }
    [HttpPost()]
    [Route("Add")]
    public async Task<IActionResult> AddNewPerson([FromForm] PersonRequest testEntity)
    {
        AddNewPersonCommand query = new(testEntity);
        var result = await _mediator.Send(query);
        if(result.IsSuccess)
            return Ok();
        return StatusCode(500);
    }
    [HttpDelete()]
    [Route("{id}")]
    public async Task<IActionResult> DeletePerson([FromRoute] int id)
    {
        var query = new DeletePersonCommand(id);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok();
        return NotFound(result.Errors[0].Message);
    }
    [HttpPut()]
    [Route("Update")]
    public async Task<IActionResult> UpdatePerson([FromForm] PersonRequest person)
    {
        var query = new UpdatePersonCommand(person);
        var result = await _mediator.Send(query);
        return result ? NoContent() : UnprocessableEntity();
    }
}
public record PersonRequest(int id, string nationalNo, string firstName, string secondName, string thirdName, string lastName,
    EnGender gender,
    DateTime dateOfBirth,
    string phone,
    string? email,
    int country,
    string address,
    IFormFile? image
    );