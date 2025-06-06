﻿namespace GymWebapp.Model.Dtos
{
    public class ClassDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int Price { get; set; }
        public string TrainerName { get; set; }
        public string ImgUrl { get; set; }
    }
    public class NewClassDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public DateTime Date { get; set; }
        public string TrainerName { get; set; }
        public IFormFile image { get; set; }
    }
    public class MyClassesDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public DateTime Date { get; set; }
        public string TrainerName { get; set; }
        public string ImgUrl { get; set; }
    }
}
