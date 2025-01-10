using System.ComponentModel.DataAnnotations.Schema;

namespace GymWebapp.Model.Data
{
    public class Trainer
    {
        [ForeignKey("User")]
        public int Id { get; set; } //Id=user?? id=foreign key?
        public User User { get; set; }
        public string PhoneNumber { get; set; }
    }
}
