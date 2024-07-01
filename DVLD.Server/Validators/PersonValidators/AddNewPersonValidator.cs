using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Commands;
using DVLD.Server.Validators.PersonValidators;
using FluentValidation;

namespace DVLD.Server.Validators.PersonDTOs;

public class AddNewPersonValidator : AbstractValidator<AddNewPersonCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    public AddNewPersonValidator(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        RuleFor(e => e.Person).SetValidator(new PersonRequestValidator(unitOfWork));
    }
}
