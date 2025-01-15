using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Data;
using GymWebapp.Model.Dtos;

namespace GymWebapp.Mapper
{
    public class MapperConfig:Profile
    {
        public MapperConfig() 
        {
            CreateMap<RegisterDto, User>();
            CreateMap<ClassDto,Class>().ForMember(dest=>dest.Trainer,null);
            CreateMap<Class, ClassDto>().ForMember(dest => dest.TrainerName, opt => opt.MapFrom(src => src.Trainer.User.Name));
            CreateMap<BougthTicket,MyTicketsDto>().ForMember(dest=>dest.TicketName,opt=>opt.MapFrom(src=>src.TicketType.Name));//mappot befejezni!!!!
        }
    }
}
