using FluentResults;
using MediatR;

namespace DVLD.Server.Commands.License
{
    public record ReleaseLicenseCommand(int LicenseId, int UserId) : IRequest<Result<int>>;
}
