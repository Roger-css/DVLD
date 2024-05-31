using DVLD.Entities.DbSets;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdateApplicationTypeCommand(ApplicationType Param) : IRequest<bool>;
