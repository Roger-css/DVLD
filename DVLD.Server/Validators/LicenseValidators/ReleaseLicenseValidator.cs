using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands.License;
using FluentValidation;

namespace DVLD.Server.Validators.LicenseValidators
{
    public class ReleaseLicenseValidator : AbstractValidator<ReleaseLicenseCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        public ReleaseLicenseValidator(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            RuleFor(x => x.LicenseId).NotNull().GreaterThanOrEqualTo(1).WithMessage("Invalid License Id")
                .MustAsync(async (e, token) => await _unitOfWork.LicenseRepository.IsDetainedLicense(e))
                .WithMessage("License is not Detained");
            RuleFor(e => e.UserId)
                .NotNull()
                .GreaterThanOrEqualTo(1)
                .MustAsync(async (id, token) => await _unitOfWork.UserRepository.GetById(id) is not null)
                .WithMessage("Invalid User Id");
        }
    }
}
