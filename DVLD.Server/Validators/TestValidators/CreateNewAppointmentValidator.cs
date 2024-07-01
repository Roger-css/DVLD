using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentValidation;

namespace DVLD.Server.Validators.TestValidators;

public class CreateNewAppointmentValidator : AbstractValidator<CreateNewAppointmentCommand>
{
    private IUnitOfWork _unitOfWork { get; set; }
    public CreateNewAppointmentValidator(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        RuleFor(e => e.Entity).ChildRules(p =>
        {
            p.RuleFor(e => e.PaidFees)
            .NotNull()
            .WithMessage("Paid fees must have a value");
            p.RuleFor(e => e.IsLocked)
                .NotNull()
                .WithMessage("Is locked must have a value");
            p.When(e => e.LocalDrivingLicenseApplicationId is not 0, () =>
            {
                p.RuleFor(e => e.LocalDrivingLicenseApplicationId)
                    .MustAsync(async (e, _) => await _unitOfWork.ApplicationRepository.LdlaExists(e))
                    .WithMessage($"Local Driving License Application ID does not exists!");
            });
            p.RuleFor(e => e.AppointmentDate).GreaterThan(DateTime.Now);
            p.RuleFor(e => e.CreatedByUserId)
                .MustAsync(async (id, _) => await _unitOfWork.UserRepository.GetById(id) is not null);
            p.RuleFor(e => e.TestTypeId)
                .NotEmpty()
                .GreaterThan(0)
                .LessThan(4)
                .WithMessage("Test type Id should be between 1 and 3");
        });

    }
}
