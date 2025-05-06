using System.ComponentModel.DataAnnotations.Schema;

namespace GymWebapp.Model.Data
{
    public class Trainer
    {
        [ForeignKey("User")]
        public int Id { get; set; }
        public User User { get; set; }
        public string PhoneNumber { get; set; }
        public string Expertise { get; set; }
        public byte[] ImageData { get; set; }
        public string ImageType { get; set; }
    }
}
