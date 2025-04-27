using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymWebapp.Model.Data
{
    public class ActiveTicket
    {
        public int Id { get; set; }

        [ForeignKey("BougthTicket")]
        public int BougthTicketId { get; set; }
        public BougthTicket BougthTicket { get; set; }

        public string AccessCode { get; set; }


        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime ExpireDate { get; set; }
    }
}