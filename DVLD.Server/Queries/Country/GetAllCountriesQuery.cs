using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using MediatR;

namespace DVLD.Server.Queries;

public class GetAllCountriesQuery : IRequest<IEnumerable<AllCountriesResponse>?>
{
}
