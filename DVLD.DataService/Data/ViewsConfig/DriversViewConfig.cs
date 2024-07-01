using DVLD.Entities.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DVLD.DataService.Data.ViewsConfig;

public class DriversViewConfig : IEntityTypeConfiguration<DriversView>
{
    public void Configure(EntityTypeBuilder<DriversView> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.ActiveLicense).HasColumnName("Active Licenses");
        builder.ToView("Drivers_View");
    }
}
