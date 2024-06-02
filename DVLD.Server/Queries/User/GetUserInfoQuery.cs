using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;
public class GetUserInfoQuery : IRequest<Result<User?>>
{
    public SearchRequest Params { get; set; }
    public GetUserInfoQuery(SearchRequest @params)
    {
        Params = @params;
    }
}
