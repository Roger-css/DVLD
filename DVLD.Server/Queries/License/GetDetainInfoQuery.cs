using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries
{
    public record GetDetainInfoQuery(int Id) : IRequest<Result<DetainInfo>>;
}
