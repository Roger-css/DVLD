

using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DVLD.DataService.Data.EntitiesConfig;

internal class TestTypeConfig : IEntityTypeConfiguration<TestType>
{
    public void Configure(EntityTypeBuilder<TestType> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.TestTypeFees).HasColumnType("smallmoney");
        builder.HasData(BaseTestTypes());
    }

    public static IEnumerable<TestType> BaseTestTypes()
    {
        return new List<TestType>()
        {
            new() {
                Id = 1,
                TestTypeTitle = "Vision Test",
                TestTypeDescription = "This assesses the applicant's visual acuity to ensure they have sufficient vision to drive safely.",
                TestTypeFees = 10.00f
            },
            new() {
                Id = 2,
                TestTypeTitle = "Written (Theory) Test",
                TestTypeDescription = "This test assesses the applicant's knowledge of traffic rules, road signs, and driving regulations. It typically consists of multiple-choice questions, and the applicant must select the correct answer(s). The written test aims to ensure that the applicant understands the rules of the road and can apply them in various driving scenarios.",
                TestTypeFees = 20.00f
            },
            new() {
                Id = 3,
                TestTypeTitle = "Practical (Street) Test",
                TestTypeDescription = "This test evaluates the applicant's driving skills and ability to operate a motor vehicle safely on public roads. A licensed examiner accompanies the applicant in the vehicle and observes their driving performance.",
                TestTypeFees = 35.00f
            }
        };
    }
}
