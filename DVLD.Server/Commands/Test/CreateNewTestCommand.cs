using DVLD.Entities.Dtos.Request;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands;

public record CreateNewTestCommand(CreateTestRequest Entity) : IRequest<Result<int>>;
