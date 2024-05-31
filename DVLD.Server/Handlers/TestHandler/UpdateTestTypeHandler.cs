using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.TestHandler;

public class UpdateTestTypeHandler : BaseHandler<UpdateTestTypeHandler>, IRequestHandler<UpdateTestTypeCommand, bool>
{
    public UpdateTestTypeHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateTestTypeHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(UpdateTestTypeCommand request, CancellationToken cancellationToken)
    {
        try
        {
            await _unitOfWork.TestRepository.UpdateTestType(request.Param);
            await _unitOfWork.CompleteAsync();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}
