using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers;
[ApiController()]
[Route("api/[Controller]")]
public class BaseController<T> : ControllerBase
{
    protected readonly IUnitOfWork _unitOfWork;
    protected readonly IMediator _mediator;
    protected readonly ILogger<T> _logger;

    public BaseController(IUnitOfWork unitOfWork, IMediator mediator, ILogger<T> logger)
    {
        _unitOfWork = unitOfWork;
        _mediator = mediator;
        _logger = logger;
    }
}
