using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers;
public class CountryController : BaseController<CountryController>
{
    public CountryController(IUnitOfWork unitOfWork, IMediator mediator, ILogger<CountryController> logger) : base(unitOfWork, mediator, logger)
    {   
    }
    [HttpGet]
    [Route("")]
    public async Task<IActionResult> GetAllCountries()
    {
        var query = new GetAllCountriesQuery();
        var countries = await _mediator.Send(query);
        if(countries.IsSuccess)
            return Ok(countries.Value);
        return StatusCode(500, countries.Errors);
    }
}
