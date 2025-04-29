namespace GymWebapp.Model.Dtos
{
    public class LogDto
    {
        public int Id { get; set; }    
        public string Exercise { get; set; }
        public DateTime Date { get; set; }
        public int setGroupId { get; set; }
        public int Repetition {  get; set; }
    }
    public class addLogDto
    {
        public int ExerciseId { get; set; }
        public DateTime Date { get; set; }
        public int Repetition { get; set; }
    }
    public class ExerciseDto
    {
        public string Name { get; set; }
        public string TargetMuscle { get; set; }
    }
}
