using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.DataService.Repositories.Interfaces;

public interface IPersonRepository : IGenericRepository<Person>
{
    public Task<bool> IsNationalNoExist(string NationalNo);
    public IQueryable<Person> Pagination(GetAllPeopleRequest Params, IQueryable<Person> Query);
    public IQueryable<Person> GetQueryable();
    public Task<bool> DeletePerson(int Id); 
    public Task<bool> UpdatePerson(Person Person);
    public Task<Person?> GetPersonBySearchParams(SearchRequest Params);
    public Task<bool> IsPersonExist(int Id);
}
