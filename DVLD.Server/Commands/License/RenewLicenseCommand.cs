using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands.License
{
    public record RenewLicenseCommand(int LicenseId, int CreatedByUserId, string Notes) : IRequest<Result<NewLicenseResponse>>;
}
