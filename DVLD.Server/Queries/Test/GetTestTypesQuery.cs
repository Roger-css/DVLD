using DVLD.Entities.DbSets;
using MediatR;

namespace DVLD.Server.Queries;

public class GetTestTypesQuery : IRequest<IEnumerable<TestType>>
{

}
