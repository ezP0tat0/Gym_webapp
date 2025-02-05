using AutoMapper;
using GymWebapp.Model;
using GymWebapp.Model.Data;
using GymWebapp.Model.Dtos;
using GymWebapp.Mapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GymWebapp.Services
{
    public interface IImgService
    {
        InnerImageDto imgToBytes(IFormFile img);
        InnerImageDto imgToBytes();
    }
    public class ImgService : IImgService
    {
        public ImgService() { }

        public InnerImageDto imgToBytes(IFormFile img)
        {
            if (img.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    img.CopyTo(ms);

                    var imgData = new InnerImageDto();

                    imgData.data = ms.ToArray();
                    imgData.type = img.ContentType;

                    return imgData;
                }

            }

            else throw new Exception("Képet nem lehet konvertálni");
        }
        public InnerImageDto imgToBytes()
        {

            var imgPath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "PFP.jpg");

            if (!System.IO.File.Exists(imgPath)) throw new Exception("alap kép nem található");

                using (var ms = new MemoryStream(System.IO.File.ReadAllBytes(imgPath)))
                {
                    var imgData = new InnerImageDto();

                    imgData.data = ms.ToArray();
                    imgData.type = "image/jpeg";

                    return imgData;
                };
        }
    }

}

