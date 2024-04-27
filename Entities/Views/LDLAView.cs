using DVLD.Entities.Enums;

namespace DVLD.Entities.Views;

public class LDLAView
{
    public int Id { get; set; }
    public string DrivingClass { get; set; }
    public string NationalNo { get; set; }
    public string FullName { get; set; }
    public DateTime ApplicationDate { get; set; }
    public int PassedTests { get; set; }
    public string Status { get; set; }
}
