using SiyaProductCollections.Data.Entities;
using System;
using System.Collections.Generic;

namespace SiyaProductCollections.Data
{
    public interface ISiyaCollectionsRepository
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> SortProductsByPrice(string priceCatagory, string catagoryIds);
        IEnumerable<Product> GetProductsByCatagory(string catagoryIds, string priceCatagory);
        IEnumerable<Product> GetProductsByTitle(string title);
        Product GetProductById(int id);
        bool UpdateProduct(int id, Product updatedProduct);
        bool DeleteProduct(int id);
        IEnumerable<Category> GetAllCategories();
        
        IEnumerable<Order> GetAllOrders(bool includeItems);
        IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems);
        Order GetOrderById(string username, int id);
        bool UpdateOrderStatus(int id, Order updateOrder);
        IEnumerable<Address> GetAddressListByUser(string username);
        bool SaveAll();
        void AddEntity(object model);
        Address GetAddressById(string username, int id);
    }
}