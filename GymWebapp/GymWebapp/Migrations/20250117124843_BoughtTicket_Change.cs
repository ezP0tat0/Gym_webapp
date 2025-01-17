using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymWebapp.Migrations
{
    /// <inheritdoc />
    public partial class BoughtTicket_Change : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ExpireDate",
                table: "BougthTickets",
                newName: "Duration");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "BougthTickets",
                newName: "ExpireDate");
        }
    }
}
