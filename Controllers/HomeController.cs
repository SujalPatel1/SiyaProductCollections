using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SiyaProductCollections.Data;
using SiyaProductCollections.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SiyaProductCollections.Controllers
{
    public class HomeController : Controller
    {
        private readonly ISiyaCollectionsRepository _respository;
        public HomeController(ISiyaCollectionsRepository respository)
        {
            _respository = respository;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("contact")]
        public IActionResult Contact()
        {
            return View();
        }

        [HttpPost("contact")]
        public IActionResult Contact(ContactViewModel model)
        {
            if(ModelState.IsValid)
            {

            }
            else
            {

            }

            return View();
        }

        [HttpGet("shop")]
        public IActionResult Shop()
        {
            var results = _respository.GetAllProducts();
            return View(results);
        }

        [HttpGet("product")]
        public IActionResult Product()
        {            
            return View();
        }
    }
}
