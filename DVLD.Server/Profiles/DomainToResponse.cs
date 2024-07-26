using AutoMapper;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Response;

namespace DVLD.Server.Profiles;

public class DomainToResponse : Profile
{
    public DomainToResponse()
    {
        CreateMap<Country, AllCountriesResponse>();
        CreateMap<Person, AllPeopleResponse>()
            .ForMember(e => e.Name, opt => opt.MapFrom(e => $"{e.FirstName} {e.SecondName} {e.ThirdName} {e.LastName}"))
            .ForMember(e => e.Gender, opt => opt.MapFrom(e => e.Gender.ToString()))
            .ForMember(e => e.NationalityCountry, opt => opt.MapFrom(e => e.Country!.CountryName));
        CreateMap<User, LessUserInfoResponse>()
            .ForMember(e => e.fullName, opt => opt.MapFrom(e =>
            $"{e.Person!.FirstName} {e.Person.SecondName} " +
            $"{e.Person.ThirdName} {e.Person.LastName}"));
        CreateMap<License, LocalLicenseInfoResponse>()
            .ForMember(e => e.FullName,
            e => e.MapFrom(e =>
            $"{e.Driver.Person!.FirstName}" +
            $" {e.Driver.Person.SecondName}" +
            $" {e.Driver.Person.ThirdName}" +
            $" {e.Driver.Person.LastName}"))
            .ForMember(e => e.Gender, e => e.MapFrom(e => e.Driver.Person!.Gender))
            .ForMember(e => e.DateOfBirth, e => e.MapFrom(e => e.Driver.Person!.BirthDate.ToString("yyyy/MM/dd")))
            .ForMember(e => e.IsDetained, e =>
            {
                e.PreCondition(e => e.DetainedLicense is not null);
                e.MapFrom(e => e.DetainedLicense!.Count > 0);
            })
            .ForMember(e => e.Image, e => e.MapFrom(e => e.Driver.Person!.Image))
            .ForMember(e => e.NationalNo, e => e.MapFrom(e => e.Driver.Person!.NationalNo))
            .ForMember(e => e.LicenseClass, e => e.MapFrom(e => e.LicenseClass.ClassName))
            .ForMember(e => e.LicenseId, e => e.MapFrom(e => e.Id))
            .ForMember(e => e.ExpireDate, e => e.MapFrom(e => e.ExpirationDate));
        CreateMap<License, AllLocalLicensesView>()
            .ForMember(dest => dest.ClassName, opt => opt.MapFrom(src => src.LicenseClass.ClassName))
            .ForMember(dest => dest.ExpirationDate
            , opt => opt.MapFrom(src => src.ExpirationDate.ToString("yyyy/MM/dd")))
            .ForMember(dest => dest.IssueDate
            , opt => opt.MapFrom(src => src.IssueDate.ToString("yyyy/MM/dd")));
    }
}
