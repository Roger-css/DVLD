using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class GetLdlaWithAppointmentsHandler : BaseHandler<GetLdlaWithAppointmentsHandler>,
    IRequestHandler<GetLdlaWithAppointmentsQuery, LdlaDetailsWithAppointments?>
{
    public GetLdlaWithAppointmentsHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<GetLdlaWithAppointmentsHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<LdlaDetailsWithAppointments?> Handle(GetLdlaWithAppointmentsQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.TestRepository.LdlaDetailsWithAppointments(request.Id,request.TypeId);
    }
}
