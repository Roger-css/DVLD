using DVLD.Entities.Dtos.Request;
using MediatR;

namespace DVLD.Server.Commands;

public record CreateNewTestCommand(CreateTestRequest Entity) : IRequest<int>;
