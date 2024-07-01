using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.ApplicationHandler
{
    public class DeleteLdlaHandler : BaseHandler<DelegatingHandler>, IRequestHandler<DeleteLdlaCommand, Result>
    {
        public DeleteLdlaHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<DelegatingHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result> Handle(DeleteLdlaCommand request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.ApplicationRepository.DeleteLdla(request.Id);
            if (result)
                return Result.Ok();
            return Result.Fail("Application already has entities associated with it");
        }
    }
}
