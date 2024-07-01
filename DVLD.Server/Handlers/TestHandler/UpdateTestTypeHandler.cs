using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.TestHandler;

public class UpdateTestTypeHandler : BaseHandler<UpdateTestTypeHandler>, IRequestHandler<UpdateTestTypeCommand, Result>
{
    public UpdateTestTypeHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateTestTypeHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result> Handle(UpdateTestTypeCommand request, CancellationToken cancellationToken)
    {
        await _unitOfWork.TestRepository.UpdateTestType(request.Param);
        await _unitOfWork.CompleteAsync();
        return Result.Ok();
    }
}
