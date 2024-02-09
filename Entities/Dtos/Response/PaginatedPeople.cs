using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.Entities.Dtos.Response;

public class PaginatedPeople
{
    public IEnumerable<AllPeopleResponse>? AllPeople { get; set; }
    public Pages Page { get; set; }
}
