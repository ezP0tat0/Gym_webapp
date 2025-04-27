namespace GymWebapp.Model.Dtos
{
    public class TicketDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Duration { get; set; }
        public int Price { get; set; }
        public string ImgUrl { get; set; }
    }
    public class MyTicketsDto
    {
        public int BoughtTicketId { get; set; }
        public string TicketName { get; set; }
        public string TicketDuration { get; set; }
    }
    public class NewTicketDto
    {
        public string Name { get; set; }
        public string Duration { get; set; }
        public int Price { get; set; }
        public IFormFile Image { get; set; }
    }
    public class NewPrice
    {
        public int Price { get; set; }
    }
    public class NewPicture
    {
        public IFormFile Image { get; set; }
    }
    public class ActiveTicketsDto
    { 
        public int BoughtTicketId { get; set; }
        public int AccessCode { get; set; }
        public DateTime ExpDate { get; set; }
    }
    public class UseTicketDto
    {
        public int BoughtTicketId { get; set; }
    }
}