using MediatR;

namespace DVLD.Server.Queries
{
    public class DeleteUserQuery: IRequest<bool>
    {
        public int Id { get; set; }
        public DeleteUserQuery(int id)
        {
            Id = id;
        }
    }
}
