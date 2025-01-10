namespace GymWebapp.Model.Data
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public byte[] pwHash { get; set; }
        public byte[] pwSalt { get; set; }
        public string Role { get; set; }
    }
}
