using DVLD.Entities.Enums;

namespace DVLD.Entities.Dtos.Request;

public class SearchRequest
{
    public string? SearchTermKey { get; set; }
    public string? SearchTermValue { get; set; }
}
