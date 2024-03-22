
namespace DVLD.Entities.Dtos.Response;

public class AuthResult
{
    public bool Result { get; set; }
    public string? Token { get; set; }
    public IEnumerable<string>? Error { get; set; }
}
