using DVLD.Entities.DbSets;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public class GetAllLicenseClassesQuery : IRequest<Result<IEnumerable<LicenseClass>?>>
{
}
