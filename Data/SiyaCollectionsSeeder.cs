using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using SiyaProductCollections.Data.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace SiyaProductCollections.Data
{
    public class SiyaCollectionsSeeder
    {
        private readonly SiyaCollectionsContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly UserManager<User> _userManager;

        public SiyaCollectionsSeeder(SiyaCollectionsContext context, 
            IWebHostEnvironment env,
            UserManager<User> userManager)
        {
            _context = context;
            _env = env;
            _userManager = userManager;
        }

        public async Task SeedAsync()
        {
            _context.Database.EnsureCreated();

            User user = await _userManager.FindByEmailAsync("sujalpmn@yahoo.com");
            if (user == null)
            {
                user = new User()
                {
                    FirstName = "Sujal",
                    LastName = "Patel",
                    Email = "sujalpmn@yahoo.com",
                    UserName = "sujalpmn@yahoo.com"
                };

                var result = await _userManager.CreateAsync(user, "Admin1234!");
                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create a new user in seeder");
                }
            }

            if (!_context.Products.Any())
            {
                // Need to create sample data
                var filePath = Path.Combine(_env.ContentRootPath, "Data/products.json");
                var json = File.ReadAllText(filePath);
                var products = JsonSerializer.Deserialize<IEnumerable<Product>>(json);
                _context.Products.AddRange(products);

                var order = _context.Orders.Where(o => o.Id == 1).FirstOrDefault();
                if (order != null)
                {
                    order.User = user;
                    order.Items = new List<OrderItem>()
                    {
                        new OrderItem()
                        {
                          Product = products.First(),
                          Quantity = 5,
                          UnitPrice = products.First().Price
                        }
                    };
                }
               
                _context.SaveChanges();
            }
        }
    }
}
