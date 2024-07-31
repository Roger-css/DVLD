using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler
{
    public class GetDetainInfoHandler : BaseHandler<GetDetainInfoHandler>, IRequestHandler<GetDetainInfoQuery, Result<DetainInfo>>
    {
        public GetDetainInfoHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetDetainInfoHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<DetainInfo>> Handle(GetDetainInfoQuery request, CancellationToken cancellationToken)
        {
            if (await _unitOfWork.LicenseRepository.GetById(request.Id) is null)
                return Result.Fail("Invalid License Id");
            if (!await _unitOfWork.LicenseRepository.IsDetainedLicense(request.Id))
                return Result.Fail("License is not Detained");
            var detainModal = await _unitOfWork.LicenseRepository.GetDetainInfo(request.Id);
            var mappedDetainInfo = _mapper.Map<DetainInfo>(detainModal);
            return mappedDetainInfo;
        }
    }
}
