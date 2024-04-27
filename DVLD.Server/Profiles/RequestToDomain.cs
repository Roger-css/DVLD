using AutoMapper;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Enums;
using DVLD.Server.Controllers;
using System.Globalization;

namespace DVLD.Server.Profiles;

public class RequestToDomain : Profile
{
    public RequestToDomain()
    {
        CreateMap<UserLoginRequest, User>();
        CreateMap<CreateLDLARequest, ApplicationRequest>();
        CreateMap<PersonRequest, Person>()
            .ForMember(dest => dest.Id, (opt) => opt.MapFrom(src => src.id))
            .ForMember(dest => dest.FirstName, (opt) => opt.MapFrom(src => src.firstName))
            .ForMember(dest => dest.SecondName, (opt) => opt.MapFrom(src => src.secondName))
            .ForMember(dest => dest.ThirdName, (opt) => opt.MapFrom(src => src.thirdName))
            .ForMember(dest => dest.LastName, (opt) => opt.MapFrom(src => src.lastName))
            .ForMember(dest => dest.NationalNo, (opt) => opt.MapFrom(src => src.nationalNo))
            .ForMember(dest => dest.Email, (opt) => opt.MapFrom(src => src.email))
            .ForMember(dest => dest.Phone, (opt) => opt.MapFrom(src => src.phone))
            .ForMember(dest => dest.Address, (opt) => opt.MapFrom(src => src.address))
            .ForMember(dest => dest.NationalityCountryId, opt => opt.MapFrom(src => src.country))
            .ForMember(dest => dest.Gender, (opt) => opt.MapFrom(src => src.gender))
            .ForMember(dest => dest.BirthDate, (opt) => opt.MapFrom(src => src.dateOfBirth))
            .ForMember(dest => dest.Image, (opt) => opt.MapFrom(src => ConvertFormFileToByteArray(src.image)))
            .ForMember(dest => dest.Country, opt => opt.Ignore());
    }
    private static byte[]? ConvertFormFileToByteArray(IFormFile? file)
    {
        if (file == null) return null;
        using (var memoryStream = new MemoryStream())
        {
            file.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }
}
