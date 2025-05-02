using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Data;
using GymWebapp.Model.Dtos;
using GymWebapp.Services;

namespace GymWebapp.Mapper
{
    public class MapperConfig : Profile
    {
        private readonly ImgService _imgService=new ImgService();
        public MapperConfig()
        {


            //class conversions
            CreateMap<NewClassDto, Class>().ForMember(dest => dest.ImageData, opt => opt.MapFrom(src => _imgService.imgToBytes(src.image).data))
                                           .ForMember(dest => dest.ImageType, opt => opt.MapFrom(src => _imgService.imgToBytes(src.image).type));

            CreateMap<Class, ClassDto>().ForMember(dest => dest.TrainerName, opt => opt.MapFrom(src => src.Trainer.User.Name))
                                        .ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => $"https://localhost:7289/api/Class/Image/{src.Id}"));

            CreateMap<Class,MyClassesDto>().ForMember(dest => dest.TrainerName, opt => opt.MapFrom(src => src.Trainer.User.Name))
                                           .ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => $"https://localhost:7289/api/Class/Image/{src.Id}"));

            //ticket conversions
            CreateMap<BougthTicket, MyTicketsDto>().ForMember(dest => dest.TicketName, opt => opt.MapFrom(src => src.TicketType.Name))
                                                   .ForMember(dest => dest.TicketDuration, opt => opt.MapFrom(src => src.Duration))
                                                   .ForMember(dest => dest.BoughtTicketId, opt => opt.MapFrom(src => src.Id));

            CreateMap<NewTicketDto, TicketType>().ForMember(dest => dest.ImageData, opt => opt.MapFrom(src => _imgService.imgToBytes(src.Image).data))
                                                 .ForMember(dest => dest.ImageType, opt => opt.MapFrom(src => _imgService.imgToBytes(src.Image).type));

            CreateMap<TicketType, TicketDto>().ForMember(dest => dest.ImgUrl, opt => opt.MapFrom(src => $"https://localhost:7289/api/Ticket/Image/{src.Id}"));
            CreateMap<ActiveTicket, ActiveTicketsDto>().ForMember(dest => dest.BoughtTicketId, opt => opt.MapFrom(src => src.BougthTicketId))
                                                        .ForMember(dest => dest.ExpDate, opt => opt.MapFrom(src => src.ExpireDate));

            //User converisons
            CreateMap<User, UserInfoDto>();
            CreateMap<RegisterDto, User>();

            CreateMap<Trainer, TranersDto>().ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.User.Name))
                                            .ForMember(dest=>dest.ImgUrl,opt=>opt.MapFrom(src => $"https://localhost:7289/api/User/Image/{src.Id}"));


            //Logging converisons
            CreateMap<Log, LogDto>().ForMember(dest => dest.Exercise, opt => opt.MapFrom(src => src.Exercise.Name));
            CreateMap<ExerciseDto,Exercise>();
            CreateMap<Exercise, ExerciseDto>();
        
        }

    }
}
