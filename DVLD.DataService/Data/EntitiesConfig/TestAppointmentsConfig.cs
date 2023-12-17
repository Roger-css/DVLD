

using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DVLD.DataService.Data.EntitiesConfig;

internal class TestAppointmentsConfig : IEntityTypeConfiguration<TestAppointment>
{
    public void Configure(EntityTypeBuilder<TestAppointment> builder)
    {
        builder.HasKey(x => x.Id);
        builder.HasOne(x => x.TestType).WithMany(x => x.TestAppointments)
            .HasForeignKey(x => x.TestTypeId).OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.User).WithMany(x => x.TestAppointmentsCreated)
            .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.LocalDrivingLicenseApplication).WithOne(x => x.TestAppointment)
            .HasForeignKey<TestAppointment>(x => x.LocalDrivingLicenseApplicationId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.Property(x => x.PaidFees).HasColumnType("smallmoney");
    }
}
