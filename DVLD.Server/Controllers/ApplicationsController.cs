﻿using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers
{
    public class ApplicationsController : BaseController<ApplicationsController>
    {
        public ApplicationsController(IUnitOfWork unitOfWork, IMediator mediator, ILogger<ApplicationsController> logger) : base(unitOfWork, mediator, logger)
        {
        }
        [HttpGet]
        [Route("types")]
        public async Task<IActionResult> GetApplicationTypes()
        {
            var query = new GetApplicationTypesQuery();
            var result = await _mediator.Send(query);
            if(result != null) 
                return Ok(result);
            return StatusCode(500, new { Error = "Idk man ur server crashed look logs" });
        }
        [HttpPut]
        [Route("types/Update")]
        public async Task<IActionResult> UpdateAppType([FromBody] ApplicationType entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid credentials"});
            }
            var query = new UpdateApplicationTypeQuery(entity);
            var result = await _mediator.Send(query);
            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost]
        [Route("LDLA")]
        public async Task<IActionResult> CreateLDLA([FromBody] CreateLDLARequest entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid credentials" });
            }
            var query = new CreateLDLAQuery(entity);
            var result = await _mediator.Send(query);
            if (result > 0)
            {
                return Ok(result);
            }
            else if(result == 0)
                return NotFound();

            else 
                return StatusCode(500,"server error look logs");
        }
        [HttpPost]
        [Route("LDLA/get")]
        public async Task<IActionResult> GetAllLDLA([FromBody] GetAllLDLARequest entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid credentials" });
            }
            try
            {
                var query = new GetPaginatedLDLAQuery(entity);
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ex}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete]
        [Route("LDLA/cancel/{entity}")]
        public async Task<IActionResult> CancelLDLA([FromRoute] int entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid credentials" });
            }
            try
            {
                var query = new CancelLDLAQuery(entity);
                var result = await _mediator.Send(query);
                if(result)
                    return Ok(result);
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError("{ex}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        [Route("LDLA/{id}")]
        public async Task<IActionResult> GetSingleLDLA([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid credentials" });
            }
            try
            {
                var query = new GetSingleLDLAQuery(id);
                var result = await _mediator.Send(query);
                if (result is not null)
                    return Ok(result);
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError("{ex}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
