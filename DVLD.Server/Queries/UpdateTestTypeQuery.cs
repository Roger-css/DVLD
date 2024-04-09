using DVLD.Entities.DbSets;
using MediatR;

namespace DVLD.Server.Queries;

public class UpdateTestTypeQuery: IRequest<bool>
{
    public TestType Param { get; set; }

    public UpdateTestTypeQuery(TestType param)
    {
        Param = param;
    }
}
