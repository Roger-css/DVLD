using DVLD.Entities.Enums;

namespace DVLD.Entities.Dtos.Request;

public class GetAllPeopleRequest
{
    public string? SearchTermKey { get; set; }
    public string? SearchTermValue { get; set; }
    public EnGender? Gender { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public string? OrderBy { get; set; }
}
