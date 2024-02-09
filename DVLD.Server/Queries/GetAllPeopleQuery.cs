using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using MediatR;

namespace DVLD.Server.Queries;

public class GetAllPeopleQuery: IRequest<PaginatedPeople>
{
    public GetAllPeopleQuery(GetAllPeople @params)
    {
        Params = @params;
    }

    public GetAllPeople Params { get; set; }
}
