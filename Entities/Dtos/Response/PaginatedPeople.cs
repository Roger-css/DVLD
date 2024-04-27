
namespace DVLD.Entities.Dtos.Response;

public class PaginatedPeople
{
    public IEnumerable<AllPeopleResponse>? AllPeople { get; set; }
    public Pages Page { get; set; }
}
