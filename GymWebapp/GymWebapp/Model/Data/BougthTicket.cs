using System.ComponentModel.DataAnnotations.Schema;

namespace GymWebapp.Model.Data
{
    public class BougthTicket
    {
        public int Id { get; set; }
        
        
        [ForeignKey("TicketType")]
        public int TicketTypeId { get; set; }
        public TicketType TicketType { get; set; }


        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }


        public DateTime ExpireDate { get; set; }
    }
}
