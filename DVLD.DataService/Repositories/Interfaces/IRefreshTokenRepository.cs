using DVLD.Entities.DbSets;

namespace DVLD.DataService.Repositories.Interfaces;

public interface IRefreshTokenRepository : IGenericRepository<RefreshToken>
{
    Task<RefreshToken?> GetByRefreshTokenAsync(string refreshToken);
    bool UpdateToken(RefreshToken token);
}
