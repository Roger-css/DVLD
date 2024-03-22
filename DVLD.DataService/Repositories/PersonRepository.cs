using DVLD.DataService.Data;
using DVLD.DataService.Helpers;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class PersonRepository : GenericRepository<Person>, IPersonRepository
{
    public PersonRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }
    public async Task<bool> IsNationalNoExist(string nationalNo)
    {
		try
		{
			var result = await _dbSet.Select((e)=> e.NationalNo).SingleOrDefaultAsync((e) => e == nationalNo);
			if(result == null)
			{
				return true;
			}
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, $"error occoured in {nameof(IsNationalNoExist)}");
			throw;
		}
		return false;
    }
    public override async Task<bool> Add(Person entity)
    {
		if (entity == null) return false;
        try
        {
            var result = await _dbSet.AddAsync(entity);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"error occoured in {nameof(Add)}");
            throw;
        }
    }

    public IQueryable<Person> Pagination(GetAllPeopleRequest Params, IQueryable<Person> Query)
    {
        if (Params.OrderBy?.ToLower() == "asc")
            Query = Query.OrderBy(e => e.Id);
        else if (Params.OrderBy?.ToLower() == "desc")
            Query = Query.OrderByDescending(e => e.Id);

        Query = Query.Skip((Params.Page - 1) * Params.PageSize).Take(Params.PageSize)
            .Select(e => new Person
            {
                Id = e.Id,
                FirstName = e.FirstName,
                SecondName = e.SecondName,
                ThirdName = e.ThirdName,
                LastName = e.LastName,
                BirthDate = e.BirthDate,
                Email = e.Email,
                Gender = e.Gender,
                Country = e.Country,
                NationalNo = e.NationalNo,
                Phone = e.Phone,
            });
        return Query;
    }
    public IQueryable<Person> GetQueryable()
    {
        return _dbSet;
    }

    public async Task<bool> DeletePerson(int id)
    {
        var entity = await _dbSet.Include(e=> e.User).FirstAsync((e)=> e.Id == id);
        if (entity == null)
            return false;
        if (entity.User != null)
            throw new Exception("fuck you bitch I am a user");
        _dbSet.Remove(entity);
        return true;
    }

    public async Task<bool> UpdatePerson(Person person)
    {
        var entity = await _dbSet.FindAsync(person.Id);
        if (entity == null)
            return false;
        entity.Email = person.Email;
        entity.FirstName = person.FirstName;
        entity.LastName = person.LastName;
        entity.BirthDate = person.BirthDate;
        entity.Gender = person.Gender;
        entity.NationalityCountryId = person.NationalityCountryId;
        entity.NationalNo = person.NationalNo;
        entity.Phone = person.Phone;
        entity.ThirdName = person.ThirdName;
        entity.Address = person.Address;
        entity.SecondName = person.SecondName;
        entity.Image = person.Image;
        _dbSet.Update(entity);
        return true;
    }

    public async Task<Person?> GetPersonBySearchParams(SearchRequest Params)
    {
        var entity = await _dbSet.HandlePersonSearch(Params.SearchTermKey!, Params.SearchTermValue!)
            .FirstOrDefaultAsync();
        return entity;
    }
}
