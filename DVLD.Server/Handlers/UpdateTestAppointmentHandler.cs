using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Queries;
using MediatR;

namespace DVLD.Server.Handlers;

public class UpdateTestAppointmentHandler : BaseHandler<UpdateTestAppointmentHandler>, IRequestHandler<UpdateTestAppointmentQuery, bool>
{
    public UpdateTestAppointmentHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateTestAppointmentHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(UpdateTestAppointmentQuery request, CancellationToken cancellationToken)
    {
        var found = await _unitOfWork.TestRepository.UpdateTestAppointment(request.TestRequest);
        if (found == null)
            return false;
        await _unitOfWork.CompleteAsync();
        return true;
    }
}

