
namespace SiyaProductCollections.Data.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountPercentage { get; set; }
        public string Brand { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public string Size { get; set; }
        public int Stock { get; set; }
        public string ImageName { get; set; }
    }
}
