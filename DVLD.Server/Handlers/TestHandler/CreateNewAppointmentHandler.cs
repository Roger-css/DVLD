using AutoMapper;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Server.Commands;
using FluentResults;
using MediatR;

namespace DVLD.Server.Handlers.TestHandler;

public class CreateNewAppointmentHandler : BaseHandler<CreateNewAppointmentHandler>,
    IRequestHandler<CreateNewAppointmentCommand, Result<int>>
{
    public CreateNewAppointmentHandler(IUnitOfWork unitOfWork, IMapper mapper, ILogger<CreateNewAppointmentHandler> logger) : base(unitOfWork, mapper, logger)
    {
    }

    public async Task<Result<int>> Handle(CreateNewAppointmentCommand request, CancellationToken cancellationToken)
    {
        var entity = _mapper.Map<TestAppointment>(request.Entity);
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
        if (Id == 0)
            return Result.Fail("UnExpected Behavior Occurred");
        return Id;
    }
    public async Task<int> FirstTest(TestAppointment entity)
    {

        await _unitOfWork.TestRepository.CreateAppointment(entity);
        await _unitOfWork.CompleteAsync();
        return entity.Id;
    }
    public async Task<int> NotFirstTest(TestAppointment entity)
    {
        var RetakeTestApp = await _unitOfWork.TestRepository.CreateRetakeTest(entity);
        await _unitOfWork.CompleteAsync();
        entity.RetakeTestApplicationId = RetakeTestApp.Id;
        await _unitOfWork.TestRepository.CreateAppointment(entity);
        await _unitOfWork.CompleteAsync();
        return entity.Id;
    }
}
