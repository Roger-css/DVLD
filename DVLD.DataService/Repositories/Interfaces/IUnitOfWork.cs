namespace DVLD.DataService.Repositories.Interfaces;

public interface IUnitOfWork
{
    IPersonRepository PersonRepository { get; set; }
    IUserRepository UserRepository { get; set; }
    IDriverRepository DriverRepository { get; set; }
    ICountryRepository CountryRepository { get; set; }
    IRefreshTokenRepository RefreshTokenRepository { get; set; }
    IApplicationTypesRepository ApplicationTypesRepository { get; set; }
    Task CompleteAsync();
}
