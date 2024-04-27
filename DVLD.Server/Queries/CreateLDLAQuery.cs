using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;

public class CreateLDLAQuery : IRequest<int>
{
    public CreateLDLARequest Param { get; set; }
    public CreateLDLAQuery(CreateLDLARequest param)
    {
        Param = param;
    }
}
