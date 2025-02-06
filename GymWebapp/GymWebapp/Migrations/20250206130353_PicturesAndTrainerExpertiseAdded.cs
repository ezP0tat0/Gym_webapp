using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GymWebapp.Migrations
{
    /// <inheritdoc />
    public partial class PicturesAndTrainerExpertiseAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "TicketTypes",
                newName: "ImageData");

            migrationBuilder.AddColumn<string>(
                name: "Expertise",
                table: "Trainers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageData",
                table: "Trainers",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "ImageType",
                table: "Trainers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageType",
                table: "TicketTypes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageData",
                table: "Classes",
                type: "BLOB",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<string>(
                name: "ImageType",
                table: "Classes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Expertise",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "ImageData",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "ImageType",
                table: "Trainers");

            migrationBuilder.DropColumn(
                name: "ImageType",
                table: "TicketTypes");

            migrationBuilder.DropColumn(
                name: "ImageData",
                table: "Classes");

            migrationBuilder.DropColumn(
                name: "ImageType",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "ImageData",
                table: "TicketTypes",
                newName: "Image");
        }
    }
}
