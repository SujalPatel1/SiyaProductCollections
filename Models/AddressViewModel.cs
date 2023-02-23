using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiyaProductCollections.Models
{
    public class AddressViewModel
    {
        public int AddressId { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public bool IsBillingAddress { get; set; }
        public bool IsShippingAddress { get; set; }
        // Postal address will be the main address of the customer
        public bool IsPostalAddress { get; set; }
        // Defines whether the address can be changed by the user later
        public bool IsChangeable { get; set; }

    }
}
