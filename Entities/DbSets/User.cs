#pragma warning disable CS8618


using System.Text.Json.Serialization;

namespace DVLD.Entities.DbSets;

public class User
{
    public int Id { get; set; }
    public int PersonId { get; set; }
    public Person? Person { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public bool IsActive { get; set; }
    [JsonIgnore]
    public ICollection<Driver>? DriversCreated { get; set; }
    [JsonIgnore]
    public ICollection<Application>? ApplicationsCreated { get; set; }
    [JsonIgnore]
    public ICollection<License>? LicensesCreated { get; set; }
    [JsonIgnore]
    public ICollection<DetainedLicense>? DetainedLicensesReleased { get; set; }
    [JsonIgnore]
    public ICollection<DetainedLicense>? DetainedLicensesCreated { get; set; }
    [JsonIgnore]
    public ICollection<InternationalDrivingLicense>? InternationalDLAsCreated { get; set; }
    [JsonIgnore]
    public ICollection<Test>? TestsCreated { get; set; }
    [JsonIgnore]
    public ICollection<TestAppointment>? TestAppointmentsCreated { get; set; }
    [JsonIgnore]
    public ICollection<RefreshToken>? RefreshTokens { get; set; }
}
