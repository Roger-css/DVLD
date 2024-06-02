using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public class GetAllPeopleQuery : IRequest<Result<PaginatedPeople>>
{
    public GetAllPeopleQuery(GetAllPeopleRequest @params)
    {
        Params = @params;
    }

    public GetAllPeopleRequest Params { get; set; }
}
