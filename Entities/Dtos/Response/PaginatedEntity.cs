
namespace DVLD.Entities.Dtos.Response;

public class PaginatedEntity<T>
{
    public IEnumerable<T>? Collection { get; set; }
    public Pages Page { get; set; }
    public static PaginatedEntity<T> NoEntities()
    {
        return new PaginatedEntity<T>
        {
            Collection = Enumerable.Empty<T>(),
            Page = Pages.EmptyPages()
        };
    }
}
