using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SiyaProductCollections.Data;
using SiyaProductCollections.Data.Entities;
using SiyaProductCollections.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SiyaProductCollections.Controllers.api
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AddressController : Controller
    {
        private readonly ISiyaCollectionsRepository _repository;
        private readonly ILogger<AddressController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public AddressController(ISiyaCollectionsRepository repository,
            ILogger<AddressController> logger,
            IMapper mapper,
            UserManager<User> userManager)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }


        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            try
            {
                var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                var addressList = _repository.GetAddressListByUser(currentUser.UserName);

                if (addressList != null)
                    return Ok(_mapper.Map<IEnumerable<AddressViewModel>>(addressList));
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get address: {ex}");
                return BadRequest("Failed to get address");
            }
        }


        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var address = _repository.GetAddressById(User.Identity.Name, id);

                if (address != null)
                    return Ok(_mapper.Map<Address, AddressViewModel>(address));
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get order: {ex}");
                return BadRequest("Failed to get order");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] AddressViewModel model)
        {
            // Add the data to Database
            try
            {
                if (ModelState.IsValid)
                {
                    var newAddress = _mapper.Map<Address>(model);
                    var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                    newAddress.User = currentUser;

                    _repository.AddEntity(newAddress);
                    if (_repository.SaveAll())
                    {
                        return Created($"/api/address/{newAddress.Id}", _mapper.Map<AddressViewModel>(newAddress));
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new address: {ex}");
            }
            return BadRequest("Failed to save new address");
        }
    }
}
