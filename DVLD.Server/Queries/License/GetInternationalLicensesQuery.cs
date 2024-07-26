using DVLD.Entities.DbSets;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries
{
    public record GetInternationalLicensesQuery(int Id) : IRequest<Result<IEnumerable<InternationalDrivingLicense>>>;
}
