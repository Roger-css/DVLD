using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;

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
        [Route("Appointments/{typeId}/{id}")]
        [HttpGet()]
        public async Task<IActionResult> GetLdlaWithAppointments([FromRoute] int typeId,[FromRoute] int id)
        {
            try
            {
                var query = new GetLdlaWithAppointmentsQuery(id, typeId);
                var result = await _mediator.Send(query);
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
        [Route("Appointments")]
        [HttpPost()]
        public async Task<IActionResult> CreateNewAppointmentForLdla([FromBody] CreateAppointmentRequest entity)
        {
            try
            {
                var query = new CreateNewAppointmentQuery(entity);
                var result = await _mediator.Send(query);
                if(result != -1)
                    return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ex}", ex);
            }
            return StatusCode(500);
        }
        [Route("")]
        [HttpPost()]
        public async Task<IActionResult> CreateNewTest([FromBody] CreateTestRequest entity)
        {
            try
            {
                var query = new CreateNewTestQuery(entity);
                var result = await _mediator.Send(query);
                if (result != -1)
                    return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ex}", ex);
            }
            return StatusCode(500);
        }
        [Route("Appointments")]
        [HttpPut()]
        public async Task<IActionResult> UpdateTestAppointment([FromBody] UpdateAppointmentRequest entity)
        {
            try
            {
                var query = new UpdateTestAppointmentQuery(entity);
                var result = await _mediator.Send(query);
                if (result)
                    return Ok();
                return BadRequest();
            }
            catch (Exception ex)
            {
                _logger.LogError("{ex}", ex);
                return StatusCode(500);
            }
        }
    }
}
