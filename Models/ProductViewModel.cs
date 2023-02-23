using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
        public string Category { get; set; }
        [Required]
        public int Stock { get; set; }
        public string Size { get; set; }
        public IFormFile Image { get; set; }
        public string ImageName { get; set; }

    }
}
