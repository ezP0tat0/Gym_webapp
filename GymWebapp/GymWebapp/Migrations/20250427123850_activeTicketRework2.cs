using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymWebapp.Migrations
{
    /// <inheritdoc />
    public partial class activeTicketRework2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActiveTickets_BougthTickets_Id",
                table: "ActiveTickets");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ActiveTickets",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "BougthTicketId",
                table: "ActiveTickets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ActiveTickets_BougthTicketId",
                table: "ActiveTickets",
                column: "BougthTicketId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActiveTickets_BougthTickets_BougthTicketId",
                table: "ActiveTickets",
                column: "BougthTicketId",
                principalTable: "BougthTickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActiveTickets_BougthTickets_BougthTicketId",
                table: "ActiveTickets");

            migrationBuilder.DropIndex(
                name: "IX_ActiveTickets_BougthTicketId",
                table: "ActiveTickets");

            migrationBuilder.DropColumn(
                name: "BougthTicketId",
                table: "ActiveTickets");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ActiveTickets",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddForeignKey(
                name: "FK_ActiveTickets_BougthTickets_Id",
                table: "ActiveTickets",
                column: "Id",
                principalTable: "BougthTickets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
