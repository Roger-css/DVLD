using DVLD.Entities.DbSets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.DataService.Repositories.Interfaces;

public interface ICountryRepository
{
    Task<IEnumerable<Country>> GetAll();
}
