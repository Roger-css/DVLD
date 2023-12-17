#pragma warning disable CS8618

namespace DVLD.Entities.DbSets;

public class ApplicationType
{
    public int ApplicationTypeId { get; set; }
    public string ApplicationTypeTitle { get; set; }
    public float ApplicationTypeFees { get; set; }
    public ICollection<Application>? Applications { get; set; }
}
