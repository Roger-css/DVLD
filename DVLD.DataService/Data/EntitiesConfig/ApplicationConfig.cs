

using DVLD.Entities.DbSets;
using DVLD.Entities.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DVLD.DataService.Data.EntitiesConfig;

internal class ApplicationConfig : IEntityTypeConfiguration<Application>
{
    public void Configure(EntityTypeBuilder<Application> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasOne(x => x.User).WithMany(x => x.ApplicationsCreated)
            .HasForeignKey(x => x.CreatedByUserId).OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.Person).WithMany(x => x.Applications)
            .HasForeignKey(x => x.ApplicationPersonId).OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.ApplicationType).WithMany(x => x.Applications)
            .HasForeignKey(x =>x.ApplicationTypeId).OnDelete(DeleteBehavior.NoAction);

        builder.Property(x => x.ApplicationStatus).HasConversion(
            x => (short)x,
            x => (EnApplicationStatus)Enum.Parse(typeof(EnApplicationStatus), x.ToString()));
        builder.Property(x => x.PaidFees).HasColumnType("smallmoney");
    }
}
