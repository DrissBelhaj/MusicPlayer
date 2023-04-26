using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicPlayer.Migrations
{
    /// <inheritdoc />
    public partial class updatedVer11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MusicId",
                table: "Song",
                newName: "ReleaseYear");

            migrationBuilder.AddColumn<string>(
                name: "Album",
                table: "Song",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Duration",
                table: "Song",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Genre",
                table: "Song",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgSrc",
                table: "Song",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SongSrc",
                table: "Song",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Album",
                table: "Song");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Song");

            migrationBuilder.DropColumn(
                name: "Genre",
                table: "Song");

            migrationBuilder.DropColumn(
                name: "ImgSrc",
                table: "Song");

            migrationBuilder.DropColumn(
                name: "SongSrc",
                table: "Song");

            migrationBuilder.RenameColumn(
                name: "ReleaseYear",
                table: "Song",
                newName: "MusicId");
        }
    }
}
