using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using DVLD.Server.Validators.PersonValidators;
using FluentValidation;

namespace DVLD.Server.Validators.PersonDTOs;

public class UpdatePersonValidator : AbstractValidator<UpdatePersonCommand>
{
    private IUnitOfWork _unitOfWork { get; }
    public UpdatePersonValidator(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        RuleFor(e => e.Person).SetValidator(new PersonRequestValidator(unitOfWork));
        RuleFor(e => e.Person.Id)
            .NotEmpty()
            .MustAsync(async (id, _) => await _unitOfWork.PersonRepository.IsPersonExist((int)id!))
            .WithMessage("Id is invalid number");
    }
}
