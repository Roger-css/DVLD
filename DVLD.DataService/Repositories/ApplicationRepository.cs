using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using DVLD.Entities.DbSets;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

internal class ApplicationRepository : GenericRepository<ApplicationType>, IApplicationRepository
{
    public ApplicationRepository(ILogger logger, DvldContext context) : base(logger, context)
    {
    }

    public async Task<bool> UpdateType(ApplicationType applicationType)
    {
		try
		{
			var entity = await _dbSet.FindAsync(applicationType.ApplicationTypeId);
			if (entity == null)
				return false;
			entity.ApplicationTypeTitle = applicationType.ApplicationTypeTitle;
			entity.ApplicationTypeFees = applicationType.ApplicationTypeFees;
			return true;
		}
		catch (Exception ex)
		{
			_logger.LogError("{ex}",ex);
		}
		return false;
    }
}
