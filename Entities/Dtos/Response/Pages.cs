namespace DVLD.Entities.Dtos.Response;

public class Pages
{
    public int TotalCount { get; set; }
    public bool HasPrev { get; set; }
    public bool HasNext { get; set; }
    public Pages(int totalPageCount, int Page, int PageSize)
    {
        int num = totalPageCount / PageSize;
        TotalCount = num * PageSize >= totalPageCount ? num : num + 1;
        HasPrev = Page > 1;
        HasNext = Page < TotalCount;
    }
}
