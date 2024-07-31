namespace DVLD.Entities.Dtos.Response
{
    public class DetainInfo
    {
        public int LicenseId { get; set; }
        public int DetainId { get; set; }
        public double Fees { get; set; }
        public string DetainDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
