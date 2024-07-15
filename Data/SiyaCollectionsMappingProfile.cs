using AutoMapper;
using SiyaProductCollections.Data.Entities;
using SiyaProductCollections.Models;

namespace SiyaProductCollections.Data
{
    public class SiyaCollectionsMappingProfile : Profile 
    {
        public SiyaCollectionsMappingProfile()
        {
            CreateMap<Order, OrderViewModel>()
              .ForMember(o => o.OrderId, ex => ex.MapFrom(i => i.Id))
              .ReverseMap();

            CreateMap<OrderItem, OrderItemViewModel>()
              .ReverseMap()
              .ForMember(o => o.Product, p => p.Ignore());

            CreateMap<Product, ProductViewModel>()
             .ForMember(o => o.ProductId, ex => ex.MapFrom(o => o.Id))
             .ReverseMap();

            CreateMap<ProductViewModel, Product>()
                .ForMember(o => o.Category, ex => ex.Ignore());

            CreateMap<UserViewModel, User>()
             .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email))
             .ReverseMap();

            CreateMap<AddressViewModel, Address>()
             .ReverseMap()
             .ForMember(o => o.AddressId, ex => ex.MapFrom(o => o.Id));
        }
    }
}
