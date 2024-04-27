using DVLD.Entities.DbSets;

namespace DVLD.Entities.Dtos.Response;

public class SingleLDLAResponse
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int ClassId { get; set; }
    public float Fees { get; set; }
    public int CreatorId { get; set; }
    public Person Person { get; set; }
}
