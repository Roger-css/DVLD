using DVLD.Entities.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DVLD.DataService.Data.ViewsConfig;

public class DetainLicensesViewConfig : IEntityTypeConfiguration<DetainedLicensesView>
{
    public void Configure(EntityTypeBuilder<DetainedLicensesView> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.FineFees).HasColumnType("smallmoney");
        builder.ToView("DetainedLicense_View");
    }
}
