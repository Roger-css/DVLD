namespace DVLD.Entities.Views
{
    public class DriversView
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string NationalNo { get; set; }
        public string FullName { get; set; }
        public DateTime Date { get; set; }
        public int ActiveLicense { get; set; }
    }
}
