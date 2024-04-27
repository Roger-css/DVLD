

using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DVLD.DataService.Data.EntitiesConfig;

internal class LicenseClassConfig : IEntityTypeConfiguration<LicenseClass>
{
    public void Configure(EntityTypeBuilder<LicenseClass> builder)
    {
        builder.Property(x => x.ClassFees).HasColumnType("smallmoney");
        builder.HasKey(x => x.Id);
        builder.HasData(GetInitialData());
    }

    private IEnumerable<LicenseClass> GetInitialData()
    {
        return new List<LicenseClass>()
        {
            new()
            {
                Id = 1,
                ClassName = "Class 1 - Small Motorcycle",
                ClassDescription = "It allows the driver to drive small motorcycles. It is suitable for motorcycles with small capacity and limited power.",
                MinimumAllowedAge = 18,
                DefaultValidityLength = 5,
                ClassFees = 15.00f
            },
            new()
            {
                Id = 2,
                ClassName = "Class 2 - Heavy Motorcycle License",
                ClassDescription = "Heavy Motorcycle License (Large Motorcycle License)",
                MinimumAllowedAge = 21,
                DefaultValidityLength = 5,
                ClassFees = 30.00f
            },
            new()
            {
                Id = 3,
                ClassName = "Class 3 - Ordinary driving license",
                ClassDescription = "Ordinary driving license (car licence)",
                MinimumAllowedAge = 18,
                DefaultValidityLength = 10,
                ClassFees = 20.00f
            },
            new()
            {
                Id = 4,
                ClassName = "Class 4 - Commercial",
                ClassDescription = "Commercial driving license (taxi/limousine)",
                MinimumAllowedAge = 21,
                DefaultValidityLength = 10,
                ClassFees = 200.00f
            },
            new()
            {
                Id = 5,
                ClassName = "Class 5 - Agricultural",
                ClassDescription = "Agricultural and work vehicles used in farming or construction (tractors / tillage machinery)",
                MinimumAllowedAge = 21,
                DefaultValidityLength = 10,
                ClassFees = 50.00f
            },
            new()
            {
                Id = 6,
                ClassName = "Class 6 - Small and medium bus",
                ClassDescription = "Small and medium bus license",
                MinimumAllowedAge = 21,
                DefaultValidityLength = 10,
                ClassFees = 250.00f
            },
            new()
            {
                Id = 7,
                ClassName = "Class 7 - Truck and heavy vehicle",
                ClassDescription = "Truck and heavy vehicle license",
                MinimumAllowedAge = 21,
                DefaultValidityLength = 10,
                ClassFees = 300.00f
            }
        };
    }
}
