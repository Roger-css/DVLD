using DVLD.Entities.DbSets;
using DVLD.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.SqlServer.Server;
using System.Data;
namespace DVLD.DataService.Data.EntitiesConfig;

internal class LicenseConfig : IEntityTypeConfiguration<License>
{
    public void Configure(EntityTypeBuilder<License> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasOne(x => x.LicenseClass).WithMany(x => x.Licenses).HasForeignKey(x=> x.LicenseClassId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.User).WithMany(x => x.LicensesCreated).HasForeignKey(x => x.CreatedByUserId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Application).WithOne(x => x.License)
            .HasForeignKey<License>(x => x.ApplicationId).OnDelete(DeleteBehavior.NoAction);
        builder.Property(e => e.IssueReason)
            .HasColumnType(SqlDbType.TinyInt.ToString())
            .HasConversion(e => (int)e, e => (EnIssueReason)Enum.Parse(typeof(EnIssueReason), e.ToString()));
        builder.HasOne(x => x.Driver).WithOne(x => x.License).HasForeignKey<License>(x => x.DriverId);
    }
}
