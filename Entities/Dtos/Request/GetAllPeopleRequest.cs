using DVLD.Entities.Enums;

namespace DVLD.Entities.Dtos.Request;

public record GetAllPeopleRequest(string? SearchTermKey,
    string? SearchTermValue,
    EnGender? Gender,
    int Page,
    int PageSize,
    EnOrderBy OrderBy);