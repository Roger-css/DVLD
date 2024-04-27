using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class GetAllLicenseClassesHandler : BaseHandler<GetAllLicenseClassesHandler>, IRequestHandler<GetAllLicenseClassesQuery, IEnumerable<LicenseClass>?>
{
    public GetAllLicenseClassesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetAllLicenseClassesHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<IEnumerable<LicenseClass>?> Handle(GetAllLicenseClassesQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.LicenseRepository.GetLicenseClasses();
    }
}
