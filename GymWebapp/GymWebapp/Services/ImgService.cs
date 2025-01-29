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
        byte[] imgToBytes(IFormFile img);
        byte[] getImg(string sBase64);
    }
    public class ImgService : IImgService
    {
        public ImgService() { }
        public byte[] getImg(string sBase64)
        {
            byte[] bytes = null;
            if (!string.IsNullOrEmpty(sBase64)) bytes=Convert.FromBase64String(sBase64);

            return bytes;
        }

        public byte[] imgToBytes(IFormFile img)
        {
            if (img.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    img.CopyTo(ms);
                    var imgBytes = ms.ToArray();

                    return imgBytes;
                }

            }

            else  throw new Exception("Képet nem lehet konvertálni");
        }
    }
}
