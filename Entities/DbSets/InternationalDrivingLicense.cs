﻿#pragma warning disable CS8618


using System.Text.Json.Serialization;

namespace DVLD.Entities.DbSets;

public class InternationalDrivingLicense
{
    public int Id { get; set; }
    public int ApplicationId { get; set; }
    public Application Application { get; set; }
    public int DriverId { get; set; }
    public Driver Driver { get; set; }
    public int IssueUsingLocalDrivingLicenseId { get; set; }
    public License License { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public bool IsActive { get; set; }
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int CreatedByUserId { get; set; }
    public User User { get; set; }
}
