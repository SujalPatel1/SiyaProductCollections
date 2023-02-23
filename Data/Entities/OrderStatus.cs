using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiyaProductCollections.Data.Entities
{
    //1 - Placed
    //2 - Preparing
    //3 - Shipped
    //4 - Delivered
    //5 - Delayed
    //6 - Partial Refunded
    //7 - Refunded
    //8 - Canceled
    public class OrderStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
