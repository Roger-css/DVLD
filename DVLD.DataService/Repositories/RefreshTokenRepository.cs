using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.DataService.Repositories;

internal class RefreshTokenRepository : GenericRepository<RefreshToken>, IRefreshTokenRepository
{
    public RefreshTokenRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }

    public async Task<RefreshToken?> GetByRefreshTokenAsync(string refreshToken)
    {
        return await _dbSet.FirstOrDefaultAsync(e => e.Token == refreshToken);
    }

    public bool UpdateToken(RefreshToken token)
    {
        _dbSet.Update(token);
        return true;
    }
}
