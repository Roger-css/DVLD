
namespace DVLD.Entities.Dtos.Response;

public class PaginatedEntity<T>
{
    public IEnumerable<T>? Collection { get; set; }
    public Pages Page { get; set; }
}
