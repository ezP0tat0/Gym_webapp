namespace GymWebapp.Model.Dtos
{
    public class TicketDto
    {
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
    }
}
