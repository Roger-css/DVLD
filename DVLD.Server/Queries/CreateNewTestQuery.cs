using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;

public class CreateNewTestQuery : IRequest<int>
{
    public CreateTestRequest Entity { get; set; }
    public CreateNewTestQuery(CreateTestRequest entity)
    {
        Entity = entity;
    }
}
