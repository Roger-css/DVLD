#pragma warning disable CS8618


namespace DVLD.Entities.DbSets;

public class LocalDrivingLicenseApplication
{
    public int Id { get; set; }
    public int ApplicationId { get; set; }
    public Application Application { get; set; }
    public int LicenseClassId { get; set; }
    public LicenseClass LicenseClass { get; set; }
    public ICollection<TestAppointment>? Appointments { get; set; }
}
