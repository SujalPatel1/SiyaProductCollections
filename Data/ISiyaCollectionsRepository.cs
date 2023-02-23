using SiyaProductCollections.Data.Entities;
using System;
using System.Collections.Generic;

namespace SiyaProductCollections.Data
{
    public interface ISiyaCollectionsRepository
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetProductsByCatagory(string catagoryIds);
        IEnumerable<Product> GetProductsByTitle(string title);
        IEnumerable<Category> GetAllCategories();
        
        IEnumerable<Order> GetAllOrders(bool includeItems);
        IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems);
        Order GetOrderById(string username, int id);
        IEnumerable<Address> GetAddressListByUser(string username);
        bool SaveAll();
        void AddEntity(object model);
        Address GetAddressById(string username, int id);
    }
}