using DVLD.Entities.DbSets;
using MediatR;

namespace DVLD.Server.Queries;

public class GetAllLicenseClassesQuery : IRequest<IEnumerable<LicenseClass>?>
{
}
