using DVLD.Entities.DbSets;
using DVLD.Entities.Enums;

namespace DVLD.Entities.Dtos.Response;

public class LdlaDetailsWithAppointments
{
    public int Id { get; set; }
    public string LicenseClass { get; set; }
    public int ApplicationId { get; set; }
    public DateTime Date { get; set; }
    public EnApplicationStatus Status { get; set; }
    public DateTime StatusDate { get; set; }
    public float PaidFees { get; set; }
    public string CreatedBy { get; set; }
    public string ApplicationType { get; set; }
    public string Name { get; set; }
    public ICollection<TestAppointment> TestAppointments { get; set; }
}

