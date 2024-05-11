using DVLD.Entities.Dtos.Response;
using MediatR;

namespace DVLD.Server.Queries;

public class GetLdlaWithAppointmentsQuery : IRequest<LdlaDetailsWithAppointments?>
{
    public int Id { get; set; }
    public int TypeId { get; set; }
    public GetLdlaWithAppointmentsQuery(int id, int typeId)
    {
        Id = id;
        TypeId = typeId;
    }
}
