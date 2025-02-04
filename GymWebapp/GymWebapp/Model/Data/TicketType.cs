namespace GymWebapp.Model.Data
{
    public class TicketType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Duration { get; set; } //number of usage or date in string form
        public int Price { get; set; }
        public byte[] ImageData { get; set; }
        public string ImageType { get; set; }
    }
}
