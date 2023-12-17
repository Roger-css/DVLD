#pragma warning disable CS8618
using DVLD.Entities.Enums;

namespace DVLD.Entities.DbSets;

public class Application
{
    public int Id { get; set; }
    public int ApplicationPersonId { get; set; }
    public Person Person { get; set; }
    public DateTime CreatedAt { set; get; }
    public int ApplicationTypeId { get; set; }
    public ApplicationType ApplicationType { get; set; }
    public EnStatus ApplicationStatus { get; set; }
    public DateTime LastStatusDate { set; get; }
    public float PaidFees { set; get; }
    public int CreatedByUserId { set; get; }
    public User User { get; set; }
    public License? License { set; get; }
    public DetainedLicense? DetainedLicense { set; get; }
    public InternationalDrivingLicense? InternationalDrivingLicenseApplication { set; get; }
    public LocalDrivingLicenseApplication? LocalDrivingLicenseApplication { get; set; }
}
