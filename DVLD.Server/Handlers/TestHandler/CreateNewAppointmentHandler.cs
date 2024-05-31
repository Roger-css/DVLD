using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Commands;
using MediatR;

namespace DVLD.Server.Handlers.TestHandler;

public class CreateNewAppointmentHandler : BaseHandler<CreateNewAppointmentHandler>,
    IRequestHandler<CreateNewAppointmentCommand, int>
{
    public CreateNewAppointmentHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<CreateNewAppointmentHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<int> Handle(CreateNewAppointmentCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entity = _mapper.Map<TestAppointment>(request.entity);
            var IsFirstTest = await _unitOfWork.TestRepository.IsFirstTest(entity.LocalDrivingLicenseApplicationId, entity.TestTypeId);
            int Id;
            if (IsFirstTest)
            {
                Id = await FirstTest(entity);
            }
            else
            {
                Id = await NotFirstTest(entity);
            }
            return Id;
        }
        catch (Exception ex)
        {
            _logger.LogError("{ex}", ex);
            return -1;
        }
    }
    public async Task<int> FirstTest(TestAppointment entity)
    {
        try
        {
            await _unitOfWork.TestRepository.CreateAppointment(entity);
            await _unitOfWork.CompleteAsync();
            return entity.Id;
        }
        catch (Exception ex)
        {
            _logger.LogError("{ex}", ex.Message);
            return -1;
        }
    }
    public async Task<int> NotFirstTest(TestAppointment entity)
    {
        try
        {
            var RetakeTestApp = await _unitOfWork.TestRepository.Create2ndTest(entity);
            await _unitOfWork.CompleteAsync();
            entity.RetakeTestApplicationId = RetakeTestApp.Id;
            await _unitOfWork.TestRepository.CreateAppointment(entity);
            await _unitOfWork.CompleteAsync();
            return entity.Id;
        }
        catch (Exception ex)
        {
            _logger.LogError("{ex}", ex.Message);
            return -1;
        }
    }
}
