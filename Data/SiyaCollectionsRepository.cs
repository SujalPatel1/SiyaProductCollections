using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SiyaProductCollections.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SiyaProductCollections.Data
{
    public class SiyaCollectionsRepository : ISiyaCollectionsRepository
    {
        private readonly SiyaCollectionsContext _context;
        private readonly ILogger<SiyaCollectionsRepository> _logger;

        public SiyaCollectionsRepository(SiyaCollectionsContext context, ILogger<SiyaCollectionsRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void AddEntity(object model)
        {
            _context.Add(model);
        }

        public Address GetAddressById(string username, int id)
        {
            try
            {
                _logger.LogInformation("GetAddressListByUser was called");

                return _context.Address
                    .Where(o => o.User.UserName == username && o.Id == id)
                    .FirstOrDefault();

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get address: {ex}");
                return null;
            }
        }

        public IEnumerable<Address> GetAddressListByUser(string username)
        {
            try
            {
                _logger.LogInformation("GetAddressListByUser was called");

                return _context.Address
                    .Where(o => o.User.UserName == username).ToList();

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get address: {ex}");
                return null;
            }
        }

        public IEnumerable<Category> GetAllCategories()
        {
            try
            {
                _logger.LogInformation("GetAllCategories was called");
                return _context.Category.ToList();

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all categories: {ex}");
                return null;
            }
        }

        public IEnumerable<Order> GetAllOrders(bool includeItems)
        {
            try
            {
                _logger.LogInformation("GetAllOrders was called");

                if (includeItems)
                {
                    return _context.Orders
                      .Include(o => o.Items)
                      .ThenInclude(o => o.Product)
                      .OrderByDescending(o => o.OrderDate)
                      .ToList();
                }
                else
                {
                    return _context.Orders.ToList();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all orders: {ex}");
                return null;
            }
        }

        public IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems)
        {
            try
            {
                _logger.LogInformation("GetAllOrdersByUser was called");

                if (includeItems)
                {

                    var orderStatus = (from o in _context.Orders
                                   join os in _context.OrderStatus on o.OrderStatusId equals os.Id
                                   where o.User.UserName == username
                                   select new { o, os }).ToList();

                    return _context.Orders
                      .Where(o => o.User.UserName == username)
                      .Include(o => o.Items)
                      .ThenInclude(o => o.Product)
                      .OrderByDescending(o => o.OrderDate)
                      .ToList();
                }
                else
                {
                    return _context.Orders
                        .Where(o => o.User.UserName == username).ToList();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all orders: {ex}");
                return null;
            }
        }

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                _logger.LogInformation("GetAllProducts was called");
                return _context.Products.OrderBy(p => p.Title).ToList();
            }
            catch(Exception ex)
            {
                _logger.LogError($"Failed to get all products: {ex}");
                return null;
            }
        }

        public Order GetOrderById(string username, int id)
        {
            try
            {
                _logger.LogInformation("GetOrderById was called");
                
                return _context.Orders
                    .Include(o => o.Items)
                    .ThenInclude(o => o.Product)
                    .Where(o => o.Id == id && o.User.UserName == username)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get order: {ex}");
                return null;
            }
        }

        public IEnumerable<Product> GetProductsByCatagory(string catagoryIds, string priceCatagory = null)
        {
            IEnumerable<Product> productList;
            List<Product> list = new List<Product>();

            if (priceCatagory != null) {
                string[] catagoryList = catagoryIds.Split(",");
                foreach (string id in catagoryList)
                {
                    int categoryId = int.Parse(id);
                    _context.Products.Where(p => p.Category.Id == categoryId).ToList().ForEach(p => list.Add(p));
                }
                if (priceCatagory.Equals("priceLowToHigh"))
                    return list.OrderBy(p => p.Price).ToList();
                else
                    return list.OrderByDescending(p => p.Price).ToList();
            }
            else
            {
                string[] catagoryList = catagoryIds.Split(",");
                foreach (string id in catagoryList)
                {
                    int categoryId = int.Parse(id);
                    _context.Products.Where(p => p.Category.Id == categoryId).ToList().ForEach(p => list.Add(p));
                }
                productList = list.ToList();
                return productList;
            }
        }

        public IEnumerable<Product> SortProductsByPrice(string priceCatagory, string catagoryIds = null)
        {
            if (catagoryIds != null)
            {
                string[] catagoryList = catagoryIds.Split(",");
                List<Product> list = new List<Product>();
                foreach (string id in catagoryList)
                {
                    int categoryId = int.Parse(id);
                    _context.Products.Where(p => p.Category.Id == categoryId).ToList().ForEach(p => list.Add(p));
                }

                if (priceCatagory.Equals("priceLowToHigh"))
                    return list.OrderBy(p => p.Price).ToList();
                else
                    return list.OrderByDescending(p => p.Price).ToList();
            }
            else
            {
                if (priceCatagory.Equals("priceLowToHigh"))
                    return _context.Products.OrderBy(p => p.Price).ToList();
                else
                    return _context.Products.OrderByDescending(p => p.Price).ToList();
            }
        }

        public IEnumerable<Product> GetProductsByTitle(string title)
        {
            return _context.Products.Where(p => p.Title.Contains(title)).ToList();
        }
        public Product GetProductById(int id)
        {
            return _context.Products.Where(p => p.Id == id).FirstOrDefault();
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public bool UpdateProduct(int id, Product updatedProduct)
        {
            try
            {
                _logger.LogInformation("UpdateProduct was called");
                var existingProduct = _context.Products.Where(o => o.Id == id).FirstOrDefault();
                if (existingProduct != null)
                {
                    existingProduct.Title = updatedProduct.Title;
                    existingProduct.ImageName = updatedProduct.ImageName;
                    existingProduct.Price = updatedProduct.Price;
                    existingProduct.Size = updatedProduct.Size;
                    existingProduct.Stock = updatedProduct.Stock;
                    existingProduct.Description = updatedProduct.Description;
                    existingProduct.DiscountPercentage = updatedProduct.DiscountPercentage;
                    existingProduct.Category = updatedProduct.Category;
                    existingProduct.Brand = updatedProduct.Brand;
                    _context.SaveChanges();
                    return true;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update product: {ex}");
                return false;
            }
        }

        public bool UpdateProductQuantityInStock(int productId, int orderQuantity)
        {
            try
            {
                _logger.LogInformation("UpdateProductQuantityInStock was called");
                var existingProduct = _context.Products.Where(o => o.Id == productId).FirstOrDefault();
                if (existingProduct != null)
                {
                    int remainingQuantityInStock = existingProduct.Stock - orderQuantity;
                    if (remainingQuantityInStock >= 0)
                    {
                        existingProduct.Stock = remainingQuantityInStock;
                        _context.SaveChanges();
                        return true;
                    }
                    return false;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update product quantity in stock: {ex}");
                return false;
            }
        }


        public bool DeleteProduct(int id)
        {
            _logger.LogInformation("DeleteProduct was called");
            var existingProduct = _context.Products.Where(o => o.Id == id).FirstOrDefault();
            if (existingProduct != null)
            {
                _context.Remove(existingProduct);
                _context.SaveChanges();
                return true;
            }
            else
                return false;
        }

        public bool UpdateOrderStatus(int id, Order updateOrder)
        {
            var existingOrder = _context.Orders
                    .Include(o => o.Items)
                    .ThenInclude(o => o.Product)
                    .Where(o => o.Id == id)
                    .FirstOrDefault();

            if (existingOrder != null)
            {
                existingOrder.OrderStatusId = updateOrder.OrderStatusId;
                _context.SaveChanges();
                return true;
            }
            else
                return false;
        }
    }
}
