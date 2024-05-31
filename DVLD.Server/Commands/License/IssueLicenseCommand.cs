using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Commands;

public record IssueLicenseCommand(IssueDrivingLicenseFirstTimeRequest request) : IRequest<int>;
