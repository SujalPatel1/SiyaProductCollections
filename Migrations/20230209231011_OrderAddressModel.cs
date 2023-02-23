using Microsoft.EntityFrameworkCore.Migrations;

namespace SiyaProductCollections.Migrations
{
    public partial class OrderAddressModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "284d1263-005a-4087-a736-2ac15d3c33d9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "89262359-df23-43a4-bc76-880451c5b830");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress",
                table: "Orders");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3dc9f3aa-b71f-40f8-a8c0-3a60b518e423", "b52d1ca4-fd04-4f24-87d7-a6b18a4b5294", "Viewer", "VIEWER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "cccb194e-2dbc-4514-886a-0ae9792b0e61", "189cafbe-e2d6-464d-87e4-e8f59975649c", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3dc9f3aa-b71f-40f8-a8c0-3a60b518e423");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cccb194e-2dbc-4514-886a-0ae9792b0e61");

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "284d1263-005a-4087-a736-2ac15d3c33d9", "54939426-c33c-4828-8f28-068fc56c5728", "Viewer", "VIEWER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "89262359-df23-43a4-bc76-880451c5b830", "eec0a72e-d771-4310-b622-c746c31cf20e", "Administrator", "ADMINISTRATOR" });
        }
    }
}
