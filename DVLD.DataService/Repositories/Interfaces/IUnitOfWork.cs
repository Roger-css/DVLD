namespace DVLD.DataService.Repositories.Interfaces;

internal interface IUnitOfWork
{
    IPersonRepository PersonRepository { get; set; }
    IUserRepository UserRepository { get; set; }
    IDriverRepository DriverRepository { get; set; }
    ICountryRepository CountryRepository { get; set; }
    void SaveChangesAsync();
}
