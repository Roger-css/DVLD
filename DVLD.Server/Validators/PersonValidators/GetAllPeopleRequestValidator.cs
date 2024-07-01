using DVLD.Entities.Dtos.Request;
using DVLD.Server.Queries;
using FluentValidation;

namespace DVLD.Server.Validators.PersonDTOs
{
    public class GetAllPeopleValidator : AbstractValidator<GetAllPeopleQuery>
    {
        public GetAllPeopleValidator()
        {
            RuleFor(e => e.Params).ChildRules((e) => {
                e.RuleFor(e => e.Page).NotEmpty().WithMessage("Page must not be empty");
                e.RuleFor(e => e.OrderBy).NotEmpty().IsInEnum();
                e.RuleFor(e => e.Gender).IsInEnum();
                e.RuleFor(e => e.PageSize).NotEmpty().GreaterThanOrEqualTo(5);
            });
            
        }
    }
}
