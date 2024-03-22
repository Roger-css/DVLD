
namespace DVLD.Entities.Dtos.Response;

public class LessUserInfoResponse
{
  public int id { get; set; }
  public int personId { get; set; }
  public string userName { get; set; }
  public string fullName { get; set; }
  public bool isActive { get; set; }
}
