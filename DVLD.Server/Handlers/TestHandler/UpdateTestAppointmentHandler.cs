using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.TestHandler;

public class UpdateTestAppointmentHandler : BaseHandler<UpdateTestAppointmentHandler>, IRequestHandler<UpdateTestAppointmentCommand, bool>
{
    public UpdateTestAppointmentHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateTestAppointmentHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<bool> Handle(UpdateTestAppointmentCommand request, CancellationToken cancellationToken)
    {
        var found = await _unitOfWork.TestRepository.UpdateTestAppointment(request.TestRequest);
        if (found == null)
            return false;
        await _unitOfWork.CompleteAsync();
        return true;
    }
}

