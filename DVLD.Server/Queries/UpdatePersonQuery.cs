using DVLD.Server.Controllers;
using MediatR;

namespace DVLD.Server.Queries;

public class UpdatePersonQuery: IRequest<bool>
{
    public UpdatePersonQuery(PersonRequest person)
    {
        Person = person;
    }

    public PersonRequest Person { get; set; }
}
