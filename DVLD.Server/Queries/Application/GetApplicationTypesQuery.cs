using DVLD.Entities.DbSets;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public class GetApplicationTypesQuery : IRequest<Result<IEnumerable<ApplicationType>>>
{
}
