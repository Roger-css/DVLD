using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.Entities.Dtos.Request;

public class IssueDrivingLicenseFirstTimeRequest
{
    public int ApplicationId { get; set; }
    public int CreatedByUserId { get; set; }
    public string? Notes { get; set; }
}
