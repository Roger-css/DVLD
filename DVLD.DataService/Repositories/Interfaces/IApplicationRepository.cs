using DVLD.Entities.DbSets;
using System;

namespace DVLD.DataService.Repositories.Interfaces;

public interface IApplicationRepository: IGenericRepository<ApplicationType>
{
    public Task<bool> UpdateType(ApplicationType applicationType);
}
