using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;

namespace DVLD.DataService.Data.EntitiesConfig;
internal class AppTypesConfig : IEntityTypeConfiguration<ApplicationType>
{
    public void Configure(EntityTypeBuilder<ApplicationType> builder)
    {
        builder.HasKey(x => x.ApplicationTypeId);
        builder.Property(e => e.ApplicationTypeId).ValueGeneratedNever();
        builder.HasData(GetInitialData());
    }
    private static IEnumerable<ApplicationType> GetInitialData()
    {
        return new List<ApplicationType>
        {
            new() { ApplicationTypeId = 1, ApplicationTypeTitle = "New Local Driving License Service", ApplicationTypeFees = 15.00f },
            new() { ApplicationTypeId = 2, ApplicationTypeTitle = "Renew Driving License Service", ApplicationTypeFees = 7.00f },
            new() { ApplicationTypeId = 3, ApplicationTypeTitle = "Replacement for a Lost Driving License", ApplicationTypeFees = 10.00f },
            new() { ApplicationTypeId = 4, ApplicationTypeTitle = "Replacement for a Damaged Driving License", ApplicationTypeFees = 5.00f },
            new() { ApplicationTypeId = 5, ApplicationTypeTitle = "Release Detained Driving License", ApplicationTypeFees = 15.00f },
            new() { ApplicationTypeId = 6, ApplicationTypeTitle = "New International License", ApplicationTypeFees = 51.00f },
            new() { ApplicationTypeId = 7, ApplicationTypeTitle = "Retake Test", ApplicationTypeFees = 5.00f }
        };
    }
}
