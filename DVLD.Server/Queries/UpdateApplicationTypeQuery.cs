using DVLD.Entities.DbSets;
using MediatR;

namespace DVLD.Server.Queries;

public class UpdateApplicationTypeQuery : IRequest<bool>
{
    public ApplicationType Param { get; set; }
    public UpdateApplicationTypeQuery(ApplicationType param)
    {
        Param = param;
    }
}
