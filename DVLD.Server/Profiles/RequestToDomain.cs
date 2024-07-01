using AutoMapper;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Server.Controllers;

namespace DVLD.Server.Profiles;

public class RequestToDomain : Profile
{
    public RequestToDomain()
    {
        CreateMap<UserLoginRequest, User>();
        CreateMap<CreateLDLARequest, ApplicationRequest>();
        CreateMap<CreateAppointmentRequest, TestAppointment>();
        CreateMap<CreateTestRequest, Test>();
        CreateMap<PersonRequest, Person>()
            .ForMember(dest => dest.Id, (opt) => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.FirstName, (opt) => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.SecondName, (opt) => opt.MapFrom(src => src.SecondName))
            .ForMember(dest => dest.ThirdName, (opt) => opt.MapFrom(src => src.ThirdName))
            .ForMember(dest => dest.LastName, (opt) => opt.MapFrom(src => src.LastName))
            .ForMember(dest => dest.NationalNo, (opt) => opt.MapFrom(src => src.NationalNo))
            .ForMember(dest => dest.Email, (opt) => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Phone, (opt) => opt.MapFrom(src => src.Phone))
            .ForMember(dest => dest.Address, (opt) => opt.MapFrom(src => src.Address))
            .ForMember(dest => dest.NationalityCountryId, opt => opt.MapFrom(src => src.Country))
            .ForMember(dest => dest.Gender, (opt) => opt.MapFrom(src => src.Gender))
            .ForMember(dest => dest.BirthDate, (opt) => opt.MapFrom(src => src.DateOfBirth))
            .ForMember(dest => dest.Image, (opt) => opt.MapFrom(src => ConvertFormFileToByteArray(src.Image)));
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
