using System.ComponentModel.DataAnnotations.Schema;

namespace GymWebapp.Model.Data
{
    public class Log
    {
        public int Id { get; set; }
        public int SetGroupId {  get; set; }

        [ForeignKey("Exercise")]
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime Date { get; set; }

        public int Repetition {  get; set; }
    }
}
