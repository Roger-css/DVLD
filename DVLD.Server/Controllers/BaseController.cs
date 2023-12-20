using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DVLD.Server.Controllers;
[ApiController()]
[Route("api/[Controller]")]
public class BaseController : ControllerBase
{
    protected readonly IUnitOfWork _unitOfWork;
    protected readonly IMapper _mapper;

    public BaseController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
}
