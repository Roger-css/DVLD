using DVLD.Entities.Views;

namespace DVLD.Entities.Dtos.Response;

public class PaginatedLDLA
{
    public IEnumerable<LDLAView>? AllLDLAs { get; set; }
    public Pages Page { get; set; }
}