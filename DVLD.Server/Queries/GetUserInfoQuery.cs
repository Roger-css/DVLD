using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Queries;
public class GetUserInfoQuery: IRequest<User?>
{
    public SearchRequest Params { get; set; }
    public GetUserInfoQuery(SearchRequest @params)
    {
        Params = @params;
    }
}
