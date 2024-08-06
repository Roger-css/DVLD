using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

namespace DVLD.DataService.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly DvldContext _context;
    public IPersonRepository PersonRepository { get; set; }
    public IUserRepository UserRepository { get; set; }
    public IDriverRepository DriverRepository { get; set; }
    public ICountryRepository CountryRepository { get; set; }
    public IRefreshTokenRepository RefreshTokenRepository { get; set; }
    public IApplicationRepository ApplicationRepository { get; set; }
    public ITestRepository TestRepository { get; set; }
    public ILicenseRepository LicenseRepository { get; set; }

    public UnitOfWork(DvldContext context, ILoggerFactory loggerFactory)
    {
        _context = context;
        var logger = loggerFactory.CreateLogger<UnitOfWork>();
        UserRepository = new UserRepository(logger, context);
        CountryRepository = new CountryRepository(logger, context);
        PersonRepository = new PersonRepository(logger, context);
        RefreshTokenRepository = new RefreshTokenRepository(logger, context);
        ApplicationRepository = new ApplicationRepository(logger, context);
        TestRepository = new TestRepository(logger, context);
        LicenseRepository = new LicenseRepository(logger, context);
        DriverRepository = new DriverRepository(logger, context);
    }

    public async Task CompleteAsync()
    {
        await _context.SaveChangesAsync();
    }
    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await _context.Database.BeginTransactionAsync();
    }
}
