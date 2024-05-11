using System.Text.Json.Serialization;

namespace DVLD.Entities.DbSets
{
    public class TestAppointment
    {
        public int Id { get; set; }
        public int TestTypeId { get; set; }
        [JsonIgnore]
        public TestType TestType { get; set; }
        public int LocalDrivingLicenseApplicationId { get; set; }
        [JsonIgnore]
        public LocalDrivingLicenseApplication? LocalDrivingLicenseApplication { get; set; }
        public DateTime AppointmentDate { get; set; }
        public float PaidFees { get; set; }
        public int CreatedByUserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public bool IsLocked { get; set; }
        [JsonIgnore]
        public Test Test { get; set; }
        public int? RetakeTestApplicationId { get; set; }
    }
}