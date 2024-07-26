using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DVLD.DataService.Migrations
{
    /// <inheritdoc />
    public partial class FixedRelationShipIssue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Licenses_DriverId",
                table: "Licenses");

            migrationBuilder.DropIndex(
                name: "IX_InternationalDrivingLicenses_DriverId",
                table: "InternationalDrivingLicenses");

            migrationBuilder.CreateIndex(
                name: "IX_Licenses_DriverId",
                table: "Licenses",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_InternationalDrivingLicenses_DriverId",
                table: "InternationalDrivingLicenses",
                column: "DriverId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Licenses_DriverId",
                table: "Licenses");

            migrationBuilder.DropIndex(
                name: "IX_InternationalDrivingLicenses_DriverId",
                table: "InternationalDrivingLicenses");

            migrationBuilder.CreateIndex(
                name: "IX_Licenses_DriverId",
                table: "Licenses",
                column: "DriverId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InternationalDrivingLicenses_DriverId",
                table: "InternationalDrivingLicenses",
                column: "DriverId",
                unique: true);
        }
    }
}
