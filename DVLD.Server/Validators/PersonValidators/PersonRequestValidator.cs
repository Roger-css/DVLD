using DVLD.DataService.Repositories.Interfaces;
using DVLD.Server.Controllers;
using FluentValidation;

namespace DVLD.Server.Validators.PersonValidators;

public class PersonRequestValidator : AbstractValidator<PersonRequest>
{
    private readonly IUnitOfWork _unitOfWork;
    public PersonRequestValidator(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        RuleFor(e => e.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("Not a valid Email");
        RuleFor(e => e.DateOfBirth).LessThanOrEqualTo(DateTime.Now.AddYears(-18))
            .WithMessage("Age Should be at least 18");
        RuleFor(e => e.Country)
            .MustAsync(async (e, token) => await _unitOfWork.CountryRepository.IsValidCountryId(e))
            .WithMessage("Country Id is not valid");
        RuleFor(e => e.FirstName).NotEmpty();
        RuleFor(e => e.SecondName).NotEmpty();
        RuleFor(e => e.ThirdName).NotEmpty();
        RuleFor(e => e.LastName).NotEmpty();
        RuleFor(e => e.Gender).IsInEnum();
    }
}
