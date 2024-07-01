using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.ApplicationHandler;

public class GetLdlaWithAppointmentsHandler : BaseHandler<GetLdlaWithAppointmentsHandler>,
    IRequestHandler<GetLdlaWithAppointmentsQuery, Result<LdlaDetailsWithAppointments>>
{
    public GetLdlaWithAppointmentsHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetLdlaWithAppointmentsHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<LdlaDetailsWithAppointments>> Handle(GetLdlaWithAppointmentsQuery request, CancellationToken cancellationToken)
    {
        var result = await _unitOfWork.TestRepository.LdlaDetailsWithAppointments(request.Id, request.TypeId);
        if (result is not null)
            return Result.Ok(result);
        return Result.Fail("Something went wrong");
    }
}
