#pragma warning disable CS8618

using System.Text.Json.Serialization;

namespace DVLD.Entities.DbSets;

public class TestType
{
    public int Id { get; set; }
    public string TestTypeTitle { get; set;}
    public string TestTypeDescription { get; set; }
    public float TestTypeFees { get; set; }
    [JsonIgnore]
    public ICollection<Test>? Tests { get; set; }
    [JsonIgnore]
    public ICollection<TestAppointment>? TestAppointments { get; set; }
}
