namespace DVLD.Entities.Dtos.Response
{
    public record LocalLicenseInfoResponse
    {
        public string LicenseClass { get; set; }
        public string FullName { get; set; }
        public int LicenseId { get; set; }
        public bool IsActive { get; set; }
        public string NationalNo { get; set; }
        public string DateOfBirth { get; set; }
        public string Gender { get; set; }
        public int DriverId { get; set; }
        public string IssueDate { get; set; }
        public string ExpireDate { get; set; }
        public string IssueReason { get; set; }
        public bool IsDetained { get; set; }
        public string Notes { get; set; }
        public byte[] Image { get; set; }
    }
}
