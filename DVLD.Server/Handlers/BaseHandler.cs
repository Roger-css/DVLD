using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;

namespace DVLD.Server.Handlers
{
    public class BaseHandler<T>
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IMapper _mapper;
        protected readonly ILogger _logger;
        public BaseHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<T> logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _logger = logger;
        }
    }
}
