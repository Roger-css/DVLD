using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class UpdateTestTypeHandler : BaseHandler<UpdateTestTypeHandler>, IRequestHandler<UpdateTestTypeQuery, bool>
{
    public UpdateTestTypeHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateTestTypeHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(UpdateTestTypeQuery request, CancellationToken cancellationToken)
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
