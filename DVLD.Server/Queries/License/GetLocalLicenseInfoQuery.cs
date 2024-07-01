using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries;

public record GetLocalLicenseInfoQuery : IRequest<Result<LocalLicenseInfoResponse>>
{
    public int Id { get; set; }

    public GetLocalLicenseInfoQuery(int id)
    {
        Id = id;
    }
}
