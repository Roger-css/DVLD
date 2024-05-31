using MediatR;

namespace DVLD.Server.Queries;

public class IsNationalNoExistsQuery : IRequest<bool>
{
    public IsNationalNoExistsQuery(string nationalNo)
    {
        NationalNo = nationalNo;
    }

    public string NationalNo { get; set; }
}
