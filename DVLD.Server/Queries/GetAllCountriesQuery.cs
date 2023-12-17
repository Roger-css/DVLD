using DVLD.Entities.DbSets;
using MediatR;

namespace DVLD.Server.Queries;

public class GetAllCountriesQuery : IRequest<IEnumerable<Country>>
{
}
