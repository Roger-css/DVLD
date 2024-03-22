using DVLD.DataService.Data;
using DVLD.DataService.Repositories.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVLD.DataService.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly DvldContext _context;
    public IPersonRepository PersonRepository { get; set; }
    public IUserRepository UserRepository { get; set; }
    public IDriverRepository DriverRepository { get; set; }
    public ICountryRepository CountryRepository { get ; set; }
    public IRefreshTokenRepository RefreshTokenRepository { get; set; }
    public IApplicationTypesRepository ApplicationTypesRepository { get; set; }

    public UnitOfWork(DvldContext context, ILoggerFactory loggerFactory)
    {
        _context = context;
        var logger = loggerFactory.CreateLogger<UnitOfWork>();
        UserRepository = new UserRepository(logger, context);
        CountryRepository = new CountryRepository(logger, context);
        PersonRepository = new PersonRepository(logger, context);
        RefreshTokenRepository = new RefreshTokenRepository(logger, context);
        ApplicationTypesRepository = new ApplicationTypesRepository(logger, context);
    }

    public async Task CompleteAsync()
    {
        await _context.SaveChangesAsync();
    }
}
