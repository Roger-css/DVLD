
namespace DVLD.Entities.Dtos.Request;

public class CreateAppointmentRequest
{
    public int TestTypeId { get; set; }
    public int LocalDrivingLicenseApplicationId { get; set; }
    public DateTime AppointmentDate { get; set; }
    public int PaidFees { get; set; }
    public int CreatedByUserId { get; set; }
    public bool IsLocked { get; set; }
    public int? RetakeTestApplicationId { get; set; }
}
