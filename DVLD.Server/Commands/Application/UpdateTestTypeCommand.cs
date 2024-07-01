using DVLD.Entities.DbSets;
using FluentResults;
using MediatR;

namespace DVLD.Server.Commands;

public record UpdateTestTypeCommand(TestType Param) : IRequest<Result>;
