using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;

public class GetPersonQuery : IRequest<Person?>
{
    public SearchRequest Params { get; set; }
    public GetPersonQuery(SearchRequest @params)
    {
        Params = @params;
    }
}