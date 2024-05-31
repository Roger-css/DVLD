using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using MediatR;

namespace DVLD.Server.Queries;

public class GetAllPeopleQuery : IRequest<PaginatedPeople>
{
    public GetAllPeopleQuery(GetAllPeopleRequest @params)
    {
        Params = @params;
    }

    public GetAllPeopleRequest Params { get; set; }
}
