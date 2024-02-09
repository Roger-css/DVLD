
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
        builder.Property(x=> x.Image).HasColumnType("varbinary(MAX)");
        builder.HasOne(x => x.User).WithOne(x => x.Person).HasForeignKey<User>(x => x.PersonId)
            .OnDelete(DeleteBehavior.NoAction);
        builder.HasOne(x => x.Country).WithMany(x => x.Person)
            .HasForeignKey(x => x.NationalityCountryId).OnDelete(DeleteBehavior.NoAction);
        builder.Property(x=> x.Gender).HasColumnType("tinyint")
            .HasConversion(x => (short)x,
            x=> (EnGender) Enum.Parse(typeof(EnGender),x.ToString()));
        builder.HasData(new Person
        {
            Id = 1,
            NationalNo = "N100",
            FirstName = "mustafa",
            SecondName = "haider",
            ThirdName = "hassan",
            LastName = "jodah",
            BirthDate = new DateTime(2003, 9, 30),
            Gender = EnGender.Male,
            Address = "Ash-shatrah city",
            Phone = "07813789596",
            Email = "mustafahaider351@gmail.com",
            NationalityCountryId = 83,
            Image = null,
        }, new Person
        {
            Id = 2,
            NationalNo = "N101",
            FirstName = "maysam",
            SecondName = "burayk",
            ThirdName = "ammar",
            LastName = "abd-alrahman",
            BirthDate = new DateTime(2004,8,10),
            Gender = EnGender.Female,
            Address = "alkhubar",
            Phone = "0538500087",
            Email = "maysamalsh-18@outlook.sa",
            NationalityCountryId = 122,
            Image = null,
        });
    }
}
