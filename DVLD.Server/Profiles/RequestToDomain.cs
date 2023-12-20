using AutoMapper;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;

namespace DVLD.Server.Profiles;

public class RequestToDomain : Profile
{
    public RequestToDomain()
    {
        CreateMap<UserLoginRequest, User>();
    }
}
