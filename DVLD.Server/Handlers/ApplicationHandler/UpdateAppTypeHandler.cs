using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.ApplicationHandler
{
    public class UpdateAppTypeHandler : BaseHandler<UpdateAppTypeHandler>, IRequestHandler<UpdateApplicationTypeCommand, bool>
    {
        public UpdateAppTypeHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateAppTypeHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<bool> Handle(UpdateApplicationTypeCommand request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.ApplicationRepository.UpdateType(request.Param);
            if (result)
            {
                await _unitOfWork.CompleteAsync();
                return true;
            }
            return false;
        }
    }
}
