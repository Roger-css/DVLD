using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;

namespace DVLD.Server.Handlers
{
    public class BaseHandler
    {
        protected IUnitOfWork _unitOfWork;
        protected IMapper _mapper;

        public BaseHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
    }
}
