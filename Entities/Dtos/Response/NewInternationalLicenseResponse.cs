namespace DVLD.Entities.Dtos.Response
{
    public class NewInternationalLicenseResponse
    {
        public NewInternationalLicenseResponse(int licenseId, int applicationId)
        {
            LicenseId = licenseId;
            ApplicationId = applicationId;
        }

        public int LicenseId { get; set; }
        public int ApplicationId { get; set; }
    }
}
