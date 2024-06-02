using FluentResults;
using MediatR;

namespace DVLD.Server.Queries
{
    public class CheckPasswordQuery : IRequest<Result<bool>>
    {
        public string Password { get; set; }
        public int Id { get; set; }
        public CheckPasswordQuery(string password, int id)
        {
            Password = password;
            Id = id;
        }
    }
}
