using DVLD.Entities.DbSets;
using DVLD.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.Entities.Dtos.Response;

public class AllPeopleResponse
{
    public int Id { get; set; }
    public string NationalNo { get; set; }
    public string Name { get; set; }
    public DateTime BirthDate { get; set; }
    public string Gender { get; set; }
    public string Phone { get; set; }
    public string? Email { get; set; }
    public string NationalityCountry { get; set; }
}
