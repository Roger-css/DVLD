using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DVLD.DataService.Migrations
{
    /// <inheritdoc />
    public partial class betterRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DetainedLicenses_LicenseId",
                table: "DetainedLicenses");

            migrationBuilder.DropIndex(
                name: "IX_DetainedLicenses_ReleaseApplicationId",
                table: "DetainedLicenses");

            migrationBuilder.CreateIndex(
                name: "IX_DetainedLicenses_LicenseId",
                table: "DetainedLicenses",
                column: "LicenseId");

            migrationBuilder.CreateIndex(
                name: "IX_DetainedLicenses_ReleaseApplicationId",
                table: "DetainedLicenses",
                column: "ReleaseApplicationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DetainedLicenses_LicenseId",
                table: "DetainedLicenses");

            migrationBuilder.DropIndex(
                name: "IX_DetainedLicenses_ReleaseApplicationId",
                table: "DetainedLicenses");

            migrationBuilder.CreateIndex(
                name: "IX_DetainedLicenses_LicenseId",
                table: "DetainedLicenses",
                column: "LicenseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DetainedLicenses_ReleaseApplicationId",
                table: "DetainedLicenses",
                column: "ReleaseApplicationId",
                unique: true);
        }
    }
}
