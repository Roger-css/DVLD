using MediatR;

namespace DVLD.Server.Queries;

public class CancelLDLAQuery : IRequest<bool>
{
    public CancelLDLAQuery(int id)
    {
        Id = id;
    }
    public int Id { get; set; }
}
