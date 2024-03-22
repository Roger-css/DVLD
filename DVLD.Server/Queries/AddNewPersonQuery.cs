using DVLD.Server.Controllers;
using MediatR;

namespace DVLD.Server.Queries;

public class AddNewPersonQuery : IRequest<bool>
{
    public PersonRequest Person { get; set; }
    public AddNewPersonQuery(PersonRequest person)
    {
        Person = person;
    }
}
