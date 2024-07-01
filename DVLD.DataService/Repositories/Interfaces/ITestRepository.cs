using DVLD.Entities.DbSets;
using DVLD.Entities.Dtos.Request;
using DVLD.Entities.Dtos.Response;

namespace DVLD.DataService.Repositories.Interfaces;

public interface ITestRepository : IGenericRepository<TestAppointment>
{
    public Task<IEnumerable<TestType>?> GetAllTestTypes();
    public Task UpdateTestType(TestType test);
    public Task<LdlaDetailsWithAppointments?> LdlaDetailsWithAppointments(int id, int typeId);
    public Task<TestAppointment> CreateAppointment(TestAppointment entity);
    public Task<Test> CreateNewTest(Test test);
    public Task<bool> UpdateTestAppointment(UpdateAppointmentRequest test);
    public Task LockAppointment(int entityId);
    public Task<bool> IsFirstTest(int Id, int testTypeId);
    public Task<Application> CreateRetakeTest(TestAppointment entity);
}
