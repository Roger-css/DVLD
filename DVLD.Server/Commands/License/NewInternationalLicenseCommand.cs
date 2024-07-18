using FluentResults;
using MediatR;

namespace DVLD.Server.Commands
{
    public class NewInternationalLicenseCommand : IRequest<Result<(int, int)>>
    {
        public int LicenseId { get; set; }
        public int CreatedByUserId { get; set; }
    }
}
