using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Enums;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace DVLD.Server.Controllers;

public class PersonController : BaseController
{
    public PersonController(IUnitOfWork unitOfWork, IMapper mapper, IMediator mediator) : base(unitOfWork, mapper, mediator)
    {
    }
    [HttpPost()]
    [Route("")]
    public async Task<IActionResult> AddNewPerson([FromForm] AddNewPersonRequest testEntity)
    {
        var query = new AddNewPersonQuery(testEntity);
        var result = await _mediator.Send(query);
        return result ? NoContent() : UnprocessableEntity();
    }
    [HttpGet()]
    [Route("{nationalNo}")]
    public async Task<IActionResult> IsNationalNoExists([FromRoute] string NationalNo)
    {
        var query = new IsNationalNoExistsQuery(NationalNo);
        var result = await _mediator.Send(query);
        return result ? Ok(result) : NotFound();
    }
    [HttpGet()]
    [Route("")]
    public async Task<IActionResult> GetAllPeople([FromQuery] GetAllPeople Params)
    {
        var query = new GetAllPeopleQuery(Params);
        var result = await _mediator.Send(query);
        return result != null ? Ok(result) : NotFound();
    }
}
public record AddNewPersonRequest(int id, string nationalNo, string firstName, string secondName, string thirdName, string lastName,
    EnGender gender,
    DateTime dateOfBirth,
    string phone,
    string? email,
    int country,
    string address,
    IFormFile? image
    );