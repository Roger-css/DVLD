
using DVLD.Entities.DbSets;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DVLD.DataService.Data.EntitiesConfig;

internal class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Person)
            .WithOne(x => x.User)
            .HasForeignKey<User>(x=> x.PersonId).OnDelete(DeleteBehavior.NoAction);
        builder.HasData(new User
        {
            Id = 1,
            PersonId = 1,
            UserName = "alone wolf",
            Password = "mhhg1234",
            IsActive = true,
        });
    }
}
