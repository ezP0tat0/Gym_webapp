namespace GymWebapp.Model.Dtos
{
    public class ImageDto
    {
        public IFormFile img {  get; set; }
        public string forWhat { get; set; }
    }
    public class InnerImageDto
    {
        public byte[] data { get; set; }
        public string type { get; set; }
    }
}
