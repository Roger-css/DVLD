using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using MediatR;

namespace DVLD.Server.Queries;

public class GetPaginatedLDLAQuery : IRequest<PaginatedLDLA?>
{
    public GetAllLDLARequest Param { get; set; } 
    public GetPaginatedLDLAQuery(GetAllLDLARequest param)
    {
        Param = param;
    }
}
