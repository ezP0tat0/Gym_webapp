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
        }
    }
}
