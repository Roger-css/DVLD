using DVLD.Entities.Enums;

namespace DVLD.Entities.Dtos.Request;

public record GetAllPeople(string? SearchTermKey,
    string? SearchTermValue,
    EnGender? Gender,
    int Page,
    int PageSize,
    string? OrderBy);
