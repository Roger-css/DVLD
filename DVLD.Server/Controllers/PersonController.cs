using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Enums;
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
        if(result != null)
            return Ok(result);
        return NotFound();
    }
    [HttpGet()]
    [Route("nationalNo/{NationalNo}")]
    public async Task<IActionResult> IsNationalNoExists([FromRoute] string NationalNo)
    {
        var query = new IsNationalNoExistsQuery(NationalNo);
        var result = await _mediator.Send(query);
        if (!result) _logger.LogInformation("National Number {No} was not found in database", NationalNo);
        return result ? NotFound() : Ok();
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
        var query = new AddNewPersonQuery(testEntity);
        var result = await _mediator.Send(query);
        return result ? NoContent() : UnprocessableEntity();
    }
    [HttpDelete()]
    [Route("{id}")]
    public async Task<IActionResult> DeletePerson([FromRoute] int id)
    {
        var query = new DeletePersonQuery(id);
        var result = await _mediator.Send(query);
        return result ? Ok() : NotFound();
    }
    [HttpPut()]
    [Route("Update")]
    public async Task<IActionResult> UpdatePerson([FromForm] PersonRequest person)
    {
        var query = new UpdatePersonQuery(person);
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