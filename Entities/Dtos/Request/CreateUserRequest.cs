
namespace DVLD.Entities.Dtos.Request;

public class CreateUserRequest
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public bool IsActive { get; set; }
}
