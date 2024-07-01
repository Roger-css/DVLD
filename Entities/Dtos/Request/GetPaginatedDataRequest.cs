using DVLD.Entities.Enums;

namespace DVLD.Entities.Dtos.Request;

public record GetPaginatedDataRequest(
    string? SearchTermKey,
    string? SearchTermValue,
    int Page,
    int PageSize,
    EnOrderBy? OrderBy);
