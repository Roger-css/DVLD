﻿#pragma warning disable CS8618

namespace DVLD.Entities.DbSets;
public class Country
{
    public int Id { get; set; }
    public string CountryName { get; set; }
    public ICollection<Person>? Person { get; set; }
}
#pragma warning restore CS8618
