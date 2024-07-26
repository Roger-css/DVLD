using DVLD.Entities.Dtos.Response;
using FluentResults;
using MediatR;

namespace DVLD.Server.Queries
{
    public record GetLocalLicensesQuery(int Id)
        : IRequest<Result<IEnumerable<AllLocalLicensesView>>>;
}
