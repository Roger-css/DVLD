#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
#pragma warning disable IDE1006 // Naming Styles

namespace DVLD.Entities.Dtos.Request;

public class CreateLDLARequest
{
    public int id { get; set; }
    public string date { get; set; }
    public int classId { get; set; }
    public int fees { get; set; }
    public int creatorId { get; set; }
    public int PersonId { get; set; }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
#pragma warning restore IDE1006 // Naming Styles
