using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdateLdlaLicenseClassCommand(UpdateLdlaLicenseClassRequest details) : IRequest;

