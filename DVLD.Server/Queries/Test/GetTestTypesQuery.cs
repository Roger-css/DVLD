using DVLD.Entities.DbSets;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public class GetTestTypesQuery : IRequest<Result<IEnumerable<TestType>>>
{

}
