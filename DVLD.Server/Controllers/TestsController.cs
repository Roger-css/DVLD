using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DVLD.Server.Controllers
{
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
            if (result != null)
            {
                return Ok(result);
            }
            return StatusCode(500, "Idk man");
        }
        [Route("Types")]
        [HttpPut()]
        public async Task<IActionResult> UpdateTestType(TestType test)
        {
            var query = new UpdateTestTypeQuery(test);
            var result = await _mediator.Send(query);
            if (result)
            {
                return Ok(result);
            }
            return StatusCode(500, "Idk man");
        }
    }
}
