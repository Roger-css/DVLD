using DVLD.Entities.DbSets;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdateTestTypeCommand(TestType Param) : IRequest<bool>;
