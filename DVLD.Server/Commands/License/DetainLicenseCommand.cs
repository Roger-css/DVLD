using FluentResults;
using MediatR;

namespace DVLD.Server.Commands.License
{
    public record DetainLicenseCommand(int LicenseId, float Fees, int CreatedByUserId) : IRequest<Result<int>>;
}
