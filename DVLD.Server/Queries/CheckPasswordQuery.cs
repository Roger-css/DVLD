using MediatR;

namespace DVLD.Server.Queries
{
    public class CheckPasswordQuery: IRequest<bool>
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
