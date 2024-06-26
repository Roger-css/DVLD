﻿using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Commands;
using MediatR;
using Serilog.Formatting.Json;

namespace DVLD.Server.Handlers.ApplicationHandler
{
    public class CreateLDLAHandler : BaseHandler<CreateLDLAHandler>, IRequestHandler<CreateLDLACommand, int>
    {
        public CreateLDLAHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<CreateLDLAHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<int> Handle(CreateLDLACommand request, CancellationToken cancellationToken)
        {
            try
            {
                if (!await _unitOfWork.ApplicationRepository.DoesPersonHasLDLA(request.Param.PersonId,
                                request.Param.classId))
                {
                    var Params = _mapper.Map<ApplicationRequest>(request.Param);
                    var Application = await _unitOfWork.ApplicationRepository.CreateLdlApplication(Params);
                    await _unitOfWork.CompleteAsync();
                    var Ldla = await _unitOfWork.ApplicationRepository.CreateLDLA(Application.Id, request.Param.classId);
                    await _unitOfWork.CompleteAsync();
                    return Ldla.Id;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("something went wrong ex = {ex}", ex);
                return -1;
            }
            return 0;
        }
    }
}
