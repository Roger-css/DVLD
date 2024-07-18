using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Server.Commands;
using DVLD.Server.Common.Extensions;
using DVLD.Server.Config;
using DVLD.Server.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DVLD.Server.Controllers;
[Authorize]
public class UserController : BaseController<UserController>
{
    private readonly IOptions<JwtConfig> _Config;
    public UserController(IUnitOfWork unitOfWork, IMediator mediator,
        ILogger<UserController> logger, IOptions<JwtConfig> Config
        ) : base(unitOfWork, mediator, logger)
    {
        _Config = Config;
    }
    [AllowAnonymous]
    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequest SigningCredentials)
    {
        var query = new LoginQuery(SigningCredentials);
        var User = await _mediator.Send(query);
        if (User.IsSuccess)
            return Ok(await GenerateJwtToken(User.Value!));

        return BadRequest(new AuthResult()
        {
            Result = false,
            Error = User.ToErrorMessages()
        });
    }
    [AllowAnonymous]
    [HttpPost]
    [Route("Refresh")]
    public async Task<IActionResult> Refresh([FromBody] TokenRequest tokenRequest)
    {
        if (!ModelState.IsValid)
            return BadRequest(new AuthResult()
            {
                Result = false,
                Error = new List<string>()
                {
                    "Invalid credentials"
                }
            });
        var Result = await VerifyTokens(tokenRequest.Token);
        if (Result.Result)
            return Ok(Result);
        else
            return BadRequest(Result);
    }
    [HttpGet]
    [Route("Logout")]
    public async Task<IActionResult> Logout()
    {
        var token = Request.Cookies.FirstOrDefault(c => c.Key == "RefreshToken").Value;
        var storedToken = await _unitOfWork.RefreshTokenRepository.GetByRefreshTokenAsync(token);
        if (storedToken != null)
        {
            storedToken.IsRevoked = true;
            _unitOfWork.RefreshTokenRepository.UpdateToken(storedToken);
            await _unitOfWork.CompleteAsync();
            Response.Cookies.Delete("RefreshToken");
            return NoContent();
        }
        return BadRequest("Invalid credentials");
    }
    [HttpGet]
    [Route("password")]
    public async Task<IActionResult> IsPasswordCurrect([FromQuery] string password, int id)
    {
        var query = new CheckPasswordQuery(password, id);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok();

        return BadRequest(result.Errors[0].Message);
    }
    [HttpPost]
    [Route("Get")]
    public async Task<IActionResult> GetAllUsers([FromBody] SearchRequest infoRequest)
    {
        var query = new GetAllUsersQuery(infoRequest);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok(result.Value);

        return NotFound(result.Errors[0]?.Message);
    }
    [HttpPost]
    [Route("Get/single")]
    public async Task<IActionResult> GetUserInfo([FromBody] SearchRequest infoRequest)
    {

        var query = new GetUserInfoQuery(infoRequest);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok(result.Value);

        return StatusCode(500);
    }
    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> AddNewUser([FromBody] CreateUserRequest infoRequest)
    {
        var query = new AddNewUserCommand(infoRequest);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok();
        return StatusCode(500);
    }
    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> UpdateUser([FromBody] CreateUserRequest infoRequest)
    {
        var query = new UpdateUserCommand(infoRequest);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return Ok();
        return StatusCode(500);
    }
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteUser([FromRoute] int id)
    {
        var query = new DeleteUserCommand(id);
        var result = await _mediator.Send(query);
        if (result.IsSuccess)
            return NoContent();
        return StatusCode(500, "Server Error");
    }
    private async Task<AuthResult> GenerateJwtToken(User user)
    {
        var Handler = new JwtSecurityTokenHandler();
        var SecurityKey = Encoding.ASCII.GetBytes(_Config.Value.SecretKey);
        var TokenDescriptor = new SecurityTokenDescriptor()
        {
            Audience = Request.Headers["Origin"] != "" ? Request.Headers["Origin"] : "",
            Issuer = _Config.Value.Issuer,
            Subject = new ClaimsIdentity(new List<Claim>
            {
                new(JwtRegisteredClaimNames.Name, user.UserName),
                new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToUniversalTime().ToString()),
            }),
            Expires = DateTime.UtcNow.AddMinutes(15), // FOR dev only
            TokenType = JwtConstants.TokenType,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(SecurityKey),
            SecurityAlgorithms.HmacSha256)
        };
        var AccessToken = Handler.CreateToken(TokenDescriptor);
        var StringToken = Handler.WriteToken(AccessToken);
        var RefreshTokenString = GenerateRefreshToken(22);
        var RefreshToken = new RefreshToken()
        {
            Token = RefreshTokenString,
            UserId = user.Id,
            AddedDate = DateTime.UtcNow,
            ExpiryDate = DateTime.UtcNow.Add(TimeSpan.Parse(_Config.Value.ExpirationTime)),
            JwtId = AccessToken.Id,
            IsUsed = false,
            IsRevoked = false,
        };
        await _unitOfWork.RefreshTokenRepository.Add(RefreshToken);
        await _unitOfWork.CompleteAsync();
        Response.Cookies.Append("RefreshToken", RefreshTokenString, new CookieOptions()
        {
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.Add(TimeSpan.Parse(_Config.Value.ExpirationTime)),
            HttpOnly = true,
            Secure = true
        });
        return new AuthResult()
        {
            Result = true,
            Token = StringToken,
        };
    }
    private async Task<AuthResult> VerifyTokens(string token)
    {
        var AuthHandler = new JwtSecurityTokenHandler();
        try
        {
            var key = Encoding.ASCII.GetBytes(_Config.Value!.SecretKey);
            var TokenValidationParams = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidateAudience = true,
                RequireExpirationTime = true,
                ValidateLifetime = false,
                ValidIssuer = _Config.Value!.Issuer,
                ValidAudience = _Config.Value!.Audience
            };
            AuthHandler.ValidateToken(token, TokenValidationParams, out var validatedToken);
            if (validatedToken is JwtSecurityToken securityToken)
            {
                var alg = securityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);
                if (!alg)
                    return new AuthResult()
                    {
                        Error = new List<string>()
                        {
                        "invalid tokens"
                        },
                        Result = false
                    };
                long expirySecond = long.Parse(securityToken.Claims
                    .FirstOrDefault(e => e.Type == JwtRegisteredClaimNames.Exp)!.Value);
                var expiryDate = DateTimeOffset.FromUnixTimeSeconds(expirySecond);
                if (expiryDate.UtcDateTime > DateTime.UtcNow)
                {
                    return new AuthResult()
                    {
                        Result = false,
                        Error = new List<string>()
                        {
                            "Token haven't Expired"
                        }
                    };
                }
                var RefreshToken = Request.Cookies.FirstOrDefault(e => e.Key == "RefreshToken").Value;
                var StoredToken = await _unitOfWork.RefreshTokenRepository
                    .GetByRefreshTokenAsync(RefreshToken);
                if (StoredToken is null || StoredToken.IsRevoked || StoredToken.IsUsed)
                    return new AuthResult()
                    {
                        Error = new List<string>()
                        {
                        "invalid tokens"
                        },
                        Result = false
                    };
                var jti = securityToken.Claims
                    .FirstOrDefault(e => e.Type == JwtRegisteredClaimNames.Jti)!.Value;
                if (jti != StoredToken.JwtId)
                    return new AuthResult()
                    {
                        Error = new List<string>()
                        {
                        "invalid tokens"
                        },
                        Result = false
                    };
                if (StoredToken.ExpiryDate < DateTime.UtcNow)
                    return new AuthResult()
                    {
                        Error = new List<string>()
                        {
                            "Expired tokens"
                        },
                        Result = false
                    };
                StoredToken.IsUsed = true;
                _unitOfWork.RefreshTokenRepository.UpdateToken(StoredToken);
                await _unitOfWork.CompleteAsync();
                var User = await _unitOfWork.UserRepository.GetUserInfo("ID", StoredToken.UserId.ToString());
                return await GenerateJwtToken(User!);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("Message = {message} error = {ex}", ex.Message, ex);
            return new AuthResult()
            {
                Result = false,
                Error = new List<string>()
                {
                    "Server Error"
                }
            };
        }
        return new AuthResult()
        {
            Error = new List<string>()
                {
                    "invalid tokens"
                },
            Result = false
        };
    }
    private static string GenerateRefreshToken(int length)
    {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz_-@#$*&";
        return new string(Enumerable.Repeat(chars, length).Select(e => e[new Random().Next(0, length)]).ToArray());
    }
}
