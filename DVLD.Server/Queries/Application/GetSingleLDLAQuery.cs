using DVLD.Entities.Dtos.Response;
using MediatR;

namespace DVLD.Server.Queries;

public record GetSingleLDLAQuery(int Id) : IRequest<SingleLDLAResponse?>;
