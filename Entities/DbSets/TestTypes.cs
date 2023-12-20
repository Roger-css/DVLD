#pragma warning disable CS8618

namespace DVLD.Entities.DbSets;

public class TestType
{
    public int Id { get; set; }
    public string TestTypeTitle { get; set;}
    public string TestTypeDescription { get; set; }
    public float TestTypeFees { get; set; }
    public ICollection<Test>? Tests { get; set; }
    public ICollection<TestAppointment>? TestAppointments { get; set; }
}
