using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SiyaProductCollections.Data;
using SiyaProductCollections.Data.Entities;
using SiyaProductCollections.Models;
using System;
using System.IO;

namespace SiyaProductCollections.Controllers
{
    [Route("api/[Controller]")]
    public class ProductsController : Controller
    {
        private readonly ISiyaCollectionsRepository _respository;
        private readonly ILogger<ProductsController> _logger;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public ProductsController(ISiyaCollectionsRepository respository, 
            ILogger<ProductsController> logger,
            IMapper mapper,
            IWebHostEnvironment env)
        {
            _respository = respository;
            _logger = logger;
            _mapper = mapper;
            _env = env;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_respository.GetAllProducts());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all products: {ex}");
                return BadRequest("Failed to get all prodcuts");
            }
        }

        [HttpGet("getProductById/{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                return Ok(_respository.GetProductById(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get products by Id : {ex}");
                return BadRequest("Failed to get products by Id");
            }
        }

        [HttpGet("getProductCategories")]
        public IActionResult GetProductCategories()
        {
            try
            {
                return Ok(_respository.GetAllCategories());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all product categories: {ex}");
                return BadRequest("Failed to get all product categories");
            }
        }

        [HttpGet("getProductByCatagoryIds/{categoryIds}")]
        public IActionResult GetProductByCatagoryIds(string categoryIds)
        {
            try
            {
                return Ok(_respository.GetProductsByCatagory(categoryIds));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get products by categoryId : {ex}");
                return BadRequest("Failed to get products by categoryId");
            }
        }
       
        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public IActionResult Post([FromForm] ProductViewModel model)
        {
            //Add Product to Database
            try
            {
                if (ModelState.IsValid)
                {
                    if (model.Image != null)
                        model.ImageName = UploadImage(model);

                    var newProduct = _mapper.Map<ProductViewModel, Product>(model);
                    _respository.AddEntity(newProduct);
                    if (_respository.SaveAll())
                        return Created($"/api/products/{newProduct.Id}", _mapper.Map<Product, ProductViewModel>(newProduct));
                }
                else
                    return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to add a new product: {ex}");
            }
            return BadRequest("Failed to add a new product");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult Put(int id, [FromForm] ProductViewModel model)
        {
            // Update the Product in the Database
            try
            {
                if (ModelState.IsValid)
                {
                    if (model.Image != null)
                        model.ImageName = UploadImage(model);

                    var updatedProduct = _mapper.Map<ProductViewModel, Product>(model);
                    if (_respository.UpdateProduct(id, updatedProduct))
                        return Ok();
                    else
                        return NotFound();
                }
                else
                    return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update product: {ex}");
                return BadRequest("Failed to update product");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult Delete(int id)
        {
            //Delete Product from Database
            try
            {
                if (_respository.DeleteProduct(id))
                    return Ok();
                else
                    return BadRequest();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete product: {ex}");
                return BadRequest("Failed to delete product");
            }
        }

        private string UploadImage(ProductViewModel model)
        {
            string uploadFolder = Path.Combine(_env.WebRootPath, "img");
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + model.Image.FileName;
            string filePath = Path.Combine(uploadFolder, uniqueFileName);
            using var fileStream = new FileStream(filePath, FileMode.Create);
            model.Image.CopyTo(fileStream);
            return uniqueFileName;
        }
    }
}
