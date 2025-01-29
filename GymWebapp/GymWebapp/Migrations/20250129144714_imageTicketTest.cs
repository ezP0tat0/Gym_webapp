using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymWebapp.Migrations
{
    /// <inheritdoc />
    public partial class imageTicketTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "TicketTypes",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "TicketTypes");
        }
    }
}
