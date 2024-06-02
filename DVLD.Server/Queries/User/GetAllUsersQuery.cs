using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public class GetAllUsersQuery : IRequest<Result<IEnumerable<LessUserInfoResponse>?>>
{
    public SearchRequest Params { get; set; }
    public GetAllUsersQuery(SearchRequest @params)
    {
        Params = @params;
    }
}
