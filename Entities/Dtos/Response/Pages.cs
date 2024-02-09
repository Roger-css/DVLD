using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.Entities.Dtos.Response;

public class Pages
{
    public int TotalCount { get; set; }
    public bool HasPrev { get; set; }
    public bool HasNext { get; set; }
    public Pages(int @totalCount, int Page, int PageSize)
    {
        var num = @totalCount / PageSize;
        TotalCount = num * PageSize >= totalCount ? num : num + 1;
        HasPrev = Page > 1;
        HasNext = Page < TotalCount;
    }
}
