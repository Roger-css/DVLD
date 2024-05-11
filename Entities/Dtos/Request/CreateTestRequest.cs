
namespace DVLD.Entities.Dtos.Request;

public record CreateTestRequest
{
    public int TestAppointmentID { get; set; }
    public int CreatedByUserId { get; set; }
    public EnTestResult TestResult { get; set; }
    public string? Notes { get; set; }
}

