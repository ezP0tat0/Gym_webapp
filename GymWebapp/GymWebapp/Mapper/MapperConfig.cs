using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Data;
using GymWebapp.Model.Dtos;

namespace GymWebapp.Mapper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<RegisterDto, User>();
           // CreateMap<ClassDto, Class>().ForMember(dest => dest.Trainer, null);
            CreateMap<Class, ClassDto>().ForMember(dest => dest.TrainerName, opt => opt.MapFrom(src => src.Trainer.User.Name));
            CreateMap<BougthTicket, MyTicketsDto>().ForMember(dest => dest.TicketName, opt => opt.MapFrom(src => src.TicketType.Name))
                                                   .ForMember(dest => dest.TicketDuration, opt => opt.MapFrom(src => src.Duration))
                                                   .ForMember(dest => dest.BoughtTicketId, opt => opt.MapFrom(src => src.Id));

            CreateMap<NewTicketDto, TicketType>();
            CreateMap<Trainer, TranersDto>().ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.User.Name));
        }

    }
}
