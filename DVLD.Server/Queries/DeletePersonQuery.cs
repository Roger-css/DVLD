using MediatR;

namespace DVLD.Server.Queries;

public class DeletePersonQuery : IRequest<bool>
{
    public DeletePersonQuery(int id)
    {
        Id = id;
    }

    public int Id { get; set; }

}