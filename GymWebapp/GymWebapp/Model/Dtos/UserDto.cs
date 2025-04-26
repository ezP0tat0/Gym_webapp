namespace GymWebapp.Model.Dtos
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    public class LoginDto : UserDto
    {
    }
    public class RegisterDto : UserDto
    {
        public string Name { get; set; }
        public string Role { get; set; }

    }
    public class AuthResponseDto
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
    public class UserInfoDto
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Id { get; set; }
    }
    public class UserInfoChangeDto
    {
        public string originalUsername { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
    public class RoleChangeDto
    {
        public int UserId { get; set; }
        public string Role { get; set; }
    }
    public class DeleteUser
    {
        public int UserId { set; get; }
    }
    public class TranersDto
    {
        public string Name { get; set; }
        public string phoneNumber { get; set; }
        public string ImgUrl { get; set; }
        public string Expertise {get;set;}
    }
}
