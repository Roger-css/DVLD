﻿using DVLD.Entities.DbSets;
using DVLD.Entities.Views;
using Microsoft.EntityFrameworkCore;

namespace DVLD.DataService.Data;

public partial class DvldContext : DbContext
{
    public DbSet<Person> People { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Application> Applications { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<ApplicationType> ApplicationTypes { get; set; }
    public DbSet<LocalDrivingLicenseApplication> LocalDrivingLicenseApplications { get; set; }
    public DbSet<License> Licenses { get; set; }
    public DbSet<LicenseClass> LicenseClasses { get; set; }
    public DbSet<InternationalDrivingLicense> InternationalDrivingLicenses { get; set; }
    public DbSet<DetainedLicense> DetainedLicenses { get; set; }
    public DbSet<Test> Tests { get; set; }
    public DbSet<TestType> TestTypes { get; set; }
    public DbSet<TestAppointment> TestAppointments { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<LDLAView> LDLAView { get; set; }
    public DbSet<DriversView> DriversView { get; set; }
    public DbSet<DetainedLicensesView> DetainedLicensesView { get; set; }
    public DvldContext(DbContextOptions<DvldContext> options)
        : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DvldContext).Assembly);
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.EnableSensitiveDataLogging();
    }
}
