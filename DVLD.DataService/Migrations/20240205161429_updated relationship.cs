using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DVLD.DataService.Migrations
{
    /// <inheritdoc />
    public partial class updatedrelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_People_NationalityCountryId",
                table: "People");

            migrationBuilder.CreateIndex(
                name: "IX_People_NationalityCountryId",
                table: "People",
                column: "NationalityCountryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_People_NationalityCountryId",
                table: "People");

            migrationBuilder.CreateIndex(
                name: "IX_People_NationalityCountryId",
                table: "People",
                column: "NationalityCountryId",
                unique: true);
        }
    }
}
