using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.TestHandler;

public class UpdateTestAppointmentHandler : BaseHandler<UpdateTestAppointmentHandler>, IRequestHandler<UpdateTestAppointmentCommand, Result<bool>>
{
    public UpdateTestAppointmentHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<UpdateTestAppointmentHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<bool>> Handle(UpdateTestAppointmentCommand request, CancellationToken cancellationToken)
    {
        var updated = await _unitOfWork.TestRepository.UpdateTestAppointment(request.TestRequest);
        if (!updated)
            throw new Exception("Something went wrong please contact developer");
        await _unitOfWork.CompleteAsync();
        return true;
    }
}

