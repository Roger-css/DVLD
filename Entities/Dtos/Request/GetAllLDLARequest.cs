namespace DVLD.Entities.Dtos.Request;

public class GetAllLDLARequest
{
    public string? SearchTermKey { get; set; }
    public string? SearchTermValue { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public string? OrderBy { get; set; }
}