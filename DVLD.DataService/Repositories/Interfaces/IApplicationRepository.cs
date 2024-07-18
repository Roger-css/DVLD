using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;
using DVLD.Entities.Views;

namespace DVLD.DataService.Repositories.Interfaces;

public interface IApplicationRepository : IGenericRepository<Application>
{
    public Task<bool> UpdateType(ApplicationType applicationType);
    public Task<Application> CreateLdlApplication(ApplicationRequest Param);
    public Task<IEnumerable<ApplicationType>?> GetAllTypes();
    public Task<bool> DoesPersonHasLDLA(int PersonId, int typeId);
    public Task<LocalDrivingLicenseApplication> CreateLDLA(int AppId, int ClassId);
    public IQueryable<LDLAView> LdlaPagination(GetPaginatedDataRequest Params, IQueryable<LDLAView> Query);
    public IQueryable<LDLAView> GetLdlaQueryable();
    public Task<bool> CancelLDLA(int LdlaId);
    public Task<bool> DeleteLdla(int id);
    public Task<bool> CompleteApplication(int Id);
    public Task<SingleLDLAResponse?> GetLDLAInfo(int LdlaId);
    public Task CreateApplication(Application application);
    public Task<Person?> GetPerson(int ApplicationId);
    public Task UpdateLdlaLicenseClass(UpdateLdlaLicenseClassRequest details);
    public Task<bool> LdlaExists(int LdlaId);
    public Task<int> CreateInternationLicenseApplication(int PersonId, int CreatedByUserId);
}
