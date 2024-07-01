using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using FluentValidation;

namespace DVLD.Server.Validators.TestValidators
{
    public class CreateTestValidator : AbstractValidator<CreateNewTestCommand>
    {
        private IUnitOfWork _unitOfWork { get; init; }
        public CreateTestValidator(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            RuleFor(e => e.Entity).ChildRules(p =>
            {
                p.RuleFor(e => e.TestResult)
                    .NotNull()
                    .IsInEnum()
                    .WithMessage("Invalid Test Result Value");
                p.RuleFor(e => e.CreatedByUserId)
                    .Cascade(CascadeMode.Stop)
                    .NotNull()
                    .MustAsync(async (e, _) => await _unitOfWork.UserRepository.GetById(e) is not null)
                    .WithMessage("Invalid Created By User Id Value");
                p.RuleFor(e => e.TestAppointmentID)
                .MustAsync(async (id, _) => await _unitOfWork.TestRepository.GetById(id) is not null)
                .WithMessage("Invalid Test Appointment Id Value");
            });
        }
    }
}