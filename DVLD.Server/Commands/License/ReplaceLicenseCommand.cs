using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands.License
{
    public record ReplaceLicenseCommand(int LicenseId, int ReasonType, int CreatedByUserId) :
        IRequest<Result<NewLicenseResponse>>;
}
