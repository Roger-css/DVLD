using DVLD.Entities.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DVLD.DataService.Data.ViewsConfig;
internal class LDLAView_config : IEntityTypeConfiguration<LDLAView>
{
    public void Configure(EntityTypeBuilder<LDLAView> builder)
    {
        builder.HasNoKey();
        builder.ToView("LocalDrivingLicenseApplications_view");
    }
}
