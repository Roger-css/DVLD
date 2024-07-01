namespace DVLD.Entities.Dtos.Response
{
    public class AllLocalLicensesView
    {
        public int Id { get; set; }
        public int ApplicationId { get; set; }
        public string ClassName { get; set; }
        public string IssueDate { get; set; }
        public string ExpirationDate { get; set; }
        public bool IsActive { get; set; }
    }
}
