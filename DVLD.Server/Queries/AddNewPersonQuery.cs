using DVLD.Server.Controllers;
using MediatR;

namespace DVLD.Server.Queries;

public class AddNewPersonQuery : IRequest<bool>
{
    public AddNewPersonRequest Person { get; set; }
    public AddNewPersonQuery(AddNewPersonRequest person)
    {
        Person = person;
    }
}
