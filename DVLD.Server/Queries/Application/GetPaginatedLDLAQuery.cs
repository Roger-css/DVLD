using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;
using MediatR;

namespace DVLD.Server.Queries;

public class GetPaginatedLDLAQuery : IRequest<PaginatedEntity<LDLAView>?>
{
    public GetPaginatedDataRequest Param { get; set; }
    public GetPaginatedLDLAQuery(GetPaginatedDataRequest param)
    {
        Param = param;
    }
}
