
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Enums;
using DVLD.Entities.Views;
using Microsoft.EntityFrameworkCore;

namespace DVLD.DataService.Helpers;

public static class QueryExtensions
{
    public static IQueryable<T> BasicSorting<T>(this IQueryable<T> source, char type) where T : class
    {
        if (source == null) throw new ArgumentNullException(nameof(source));
        if (type == 'a')
        {
            return source.OrderBy(e => e);
        }
        else
        {
            return source.OrderByDescending(e => e);
        }
    }
    public static IQueryable<T> BasicSorting<T>(this IQueryable<T> source, EnOrderBy? type) where T : class
    {
        if (source == null) throw new ArgumentNullException(nameof(source));
        if (type == EnOrderBy.asc)
        {
            return source.OrderBy(e => e);
        }
        else
        {
            return source.OrderByDescending(e => e);
        }
    }
    public static IQueryable<Person> HandlePersonSearch(this IQueryable<Person> query, string key, string value)
    {
        switch (key.ToLower())
        {
            case "id":
                return query.Where(e => e.Id == Convert.ToInt32(value));
            case "name":
                return query.Where(e => (e.FirstName + " " + e.SecondName + " " + e.ThirdName + " " + e.LastName).Contains(value));
            case "phone":
                return query.Where(e => e.Phone.Contains(value));
            case "nationalno":
                return query.Where(e => e.NationalNo.Contains(value));
            case "email":
                return query.Where(e => e.Email!.Contains(value));
            default: return query;
        }
    }
    public static IQueryable<User> HandlePersonSearch(this IQueryable<User> query, string key, string value)
    {
        switch (key.ToLower())
        {
            case "id":
                return query.Where(e => e.Person.Id == Convert.ToInt32(value));
            case "name":
                return query.Where(e => (e.Person.FirstName + " " + e.Person.SecondName +
                " " + e.Person.ThirdName + " " + e.Person.LastName).Contains(value));
            case "phone":
                return query.Where(e => e.Person.Phone.Contains(value));
            case "nationalno":
                return query.Where(e => e.Person.NationalNo.Contains(value));
            case "email":
                return query.Where(e => e.Person.Email.Contains(value));
            default: return query;
        }
    }
    public static IQueryable<LDLAView> HandleLDLASearch(this IQueryable<LDLAView> query, string key, string value)
    {
        switch (key.ToLower())
        {
            case "id":
                return query.Where(e => e.Id == Convert.ToInt32(value));
            case "status":
                return query.Where(e => e.Status.Contains(value));
            case "nationalno":
                return query.Where(e => e.NationalNo.Contains(value));
            case "fullname":
                return query.Where(e => e.FullName.Contains(value));
            default: return query;
        }
    }
    public static IQueryable<DriversView>? HandleDriversSearch(this IQueryable<DriversView> query, string searchTermKey, string searchTermValue)
    {
        if (searchTermKey!.ToLower().Contains("id") && int.TryParse(searchTermKey, out var id))
            return null;
        switch (searchTermKey!.ToLower())
        {
            case "id":
                return query.Where(e => e.Id == Convert.ToInt32(searchTermValue));
            case "personid":
                return query.Where(e => e.Id == Convert.ToInt32(searchTermValue));
            case "fullname":
                return query.Where(e => e.FullName.Contains(searchTermValue));
            case "nationalno":
                return query.Where(e => e.NationalNo.Contains(searchTermValue));
            default:
                return query;
        }
    }
    public static IQueryable<T> HandlePagination<T>(this IQueryable<T> query, int page, int pageSize)
    {
        return query.Skip((page - 1) * pageSize).Take(pageSize);
    }
    public static async Task<Pages> HandlePages<T>(this IQueryable<T> Query, int Page, int PageSize, CancellationToken? cancellationToken = null)
    {
        int totalEntities;
        if (cancellationToken.HasValue)
        {
            totalEntities = await Query.CountAsync(cancellationToken.Value);
        }
        else
        {
            totalEntities = await Query.CountAsync();
        }
        return new Pages(totalEntities, Page, PageSize);
    }
}
