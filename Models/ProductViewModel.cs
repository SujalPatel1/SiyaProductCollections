using Microsoft.AspNetCore.Http;
using SiyaProductCollections.Data.Entities;
using System.ComponentModel.DataAnnotations;

namespace SiyaProductCollections.Models
{
    public class ProductViewModel
    {
        public int ProductId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public decimal DiscountPercentage { get; set; }
        public string Brand { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        [Required]
        public int Stock { get; set; }
        public string Size { get; set; }
        public IFormFile Image { get; set; }
        public string ImageName { get; set; }

    }
}
