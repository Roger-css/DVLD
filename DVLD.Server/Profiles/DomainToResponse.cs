using AutoMapper;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;

namespace DVLD.Server.Profiles;

public class DomainToResponse: Profile
{
    public DomainToResponse()
    {
        CreateMap<Country, AllCountriesResponse>();
        CreateMap<Person, AllPeopleResponse>()
            .ForMember(e => e.Name, opt => opt.MapFrom(e => $"{e.FirstName} {e.SecondName} {e.ThirdName} {e.LastName}"))
            .ForMember(e => e.Gender, opt => opt.MapFrom(e => e.Gender.ToString()))
            .ForMember(e => e.NationalityCountry, opt => opt.MapFrom(e => e.Country!.CountryName));
    }
}
