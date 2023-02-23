using SiyaProductCollections.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SiyaProductCollections.Models
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        [Required]
        [MinLength(4)]
        public string OrderNumber { get; set; }
        public ICollection<OrderItemViewModel> Items { get; set; }
        public AddressViewModel Address { get; set; }
        [Required]
        public int AddressId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        [Required]
        public int OrderStatusId { get; set; }
        public decimal OrderTotal { get; set; }
    }
}
