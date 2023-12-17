
using DVLD.Entities.DbSets;
using DVLD.Entities.Enums;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Data;

namespace DVLD.DataService.Data.EntitiesConfig;

internal class PersonConfig : IEntityTypeConfiguration<Person>
{
    public void Configure(EntityTypeBuilder<Person> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.BirthDate).HasColumnName("DateOfBirth");
        builder.Property(x=> x.Image).HasColumnType("varbinary");
        builder.HasOne(x => x.User).WithOne(x => x.Person).HasForeignKey<User>(x => x.PersonId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Country).WithOne(x => x.Person)
            .HasForeignKey<Person>(x => x.NationalityCountryId).OnDelete(DeleteBehavior.NoAction);
        builder.Property(x=> x.Gender).HasColumnType("tinyint")
            .HasConversion(x => (short)x,
            x=> (EnGender) Enum.Parse(typeof(EnGender),x.ToString()));
    }
}
