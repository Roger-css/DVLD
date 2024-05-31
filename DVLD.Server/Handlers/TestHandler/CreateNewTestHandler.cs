using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.TestHandler;

public class CreateNewTestHandler : BaseHandler<CreateNewTestHandler>, IRequestHandler<CreateNewTestCommand, int>
{
    public CreateNewTestHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<CreateNewTestHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<int> Handle(CreateNewTestCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var test = _mapper.Map<Test>(request.Entity);
            await _unitOfWork.TestRepository.CreateNewTest(test);
            await _unitOfWork.TestRepository.LockAppointment(test.TestAppointmentId);
            await _unitOfWork.CompleteAsync();
            return test.Id;
        }
        catch (Exception ex)
        {
            _logger.LogError("{ex}", ex);
            return -1;
        }
    }
}
