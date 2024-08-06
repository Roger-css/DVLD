namespace DVLD.Entities.Views;

public class DetainedLicensesView
{
    public int Id { get; set; }
    public int LicenseId { get; set; }
    public DateTime DetainDate { get; set; }
    public float FineFees { get; set; }
    public bool IsReleased { get; set; }
    public DateTime? ReleaseDate { get; set; }
    public int? ReleaseApplicationId { get; set; }
    public string NationalNo { get; set; }
    public string FullName { get; set; }
}
