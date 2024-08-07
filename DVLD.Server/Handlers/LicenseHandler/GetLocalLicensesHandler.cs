﻿using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.LicenseHandler
{
    public class GetLocalLicensesHandler : BaseHandler<GetLocalLicensesHandler>, IRequestHandler<GetLocalLicensesQuery, Result<IEnumerable<AllLocalLicensesView>>>
    {
        public GetLocalLicensesHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetLocalLicensesHandler> logger) : base(unitOfWork, mapper, logger)
        {
        }

        public async Task<Result<IEnumerable<AllLocalLicensesView>>>
            Handle(GetLocalLicensesQuery request, CancellationToken cancellationToken)
        {
            var entities = await _unitOfWork.LicenseRepository.GetLocalLicensesAsync(request.Id);
            if (entities == null)
                return Result.Fail("No licenses were found");
            var mappedEntites = _mapper.Map<IEnumerable<AllLocalLicensesView>>(entities);
            return Result.Ok(mappedEntites);
        }
    }
}
