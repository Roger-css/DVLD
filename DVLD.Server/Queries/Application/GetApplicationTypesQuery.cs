using DVLD.Entities.DbSets;
using MediatR;

namespace DVLD.Server.Queries;

public class GetApplicationTypesQuery : IRequest<IEnumerable<ApplicationType>?>
{
}
