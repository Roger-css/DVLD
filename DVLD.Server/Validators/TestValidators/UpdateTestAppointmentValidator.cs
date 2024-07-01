using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentValidation;

namespace DVLD.Server.Validators.TestValidators
{
    public class UpdateTestAppointmentValidator : AbstractValidator<UpdateTestAppointmentCommand>
    {
        private IUnitOfWork _unitOfWork { get; init; }
        public UpdateTestAppointmentValidator(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            RuleFor(e => e.TestRequest).ChildRules(p =>
            {
                p.RuleFor(e => e.Id)
                    .MustAsync(async (id, _) => await _unitOfWork.TestRepository.GetById(id) is not null)
                    .WithMessage("Such Id does not exist");
                p.RuleFor(e => e.AppointmentDate)
                    .GreaterThan(DateTime.Now)
                    .WithMessage("Appointment date can't Be in the past");
            });
        }
    }
}
