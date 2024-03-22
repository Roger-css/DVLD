
using System.ComponentModel.DataAnnotations;

namespace DVLD.Entities.Dtos.Request;

public class TokenRequest
{
    [Required]
    public string Token { get; set; } = string.Empty;
}
