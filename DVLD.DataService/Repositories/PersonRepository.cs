using Azure.Core;
using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

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
			Logger.LogError(ex, $"error occoured in {nameof(IsNationalNoExist)}");
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
            Logger.LogError(ex, $"error occoured in {nameof(IsNationalNoExist)}");
            throw;
        }
    }

    public IQueryable<Person> Pagination(GetAllPeople Params, IQueryable<Person> Query)
    {
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
                Phone = e.Phone
            });
        if (Params.OrderBy?.ToLower() == "asc")
            Query = Query.OrderBy(e => e.Id);
        else if(Params.OrderBy?.ToLower() == "desc")
            Query = Query.OrderByDescending(e => e.Id);

        return Query;
    }
    public IQueryable<Person> GetQueryable()
    {
        return _dbSet;
    }
}
