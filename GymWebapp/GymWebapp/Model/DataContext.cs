using Microsoft.EntityFrameworkCore;
using GymWebapp.Model.Data;

namespace GymWebapp.Model
{
    public class DataContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<TicketType> TicketTypes { get; set; }
        public DbSet<BougthTicket> BougthTickets { get; set; }
        public DbSet<ActiveTicket> ActiveTickets { get; set; }
        public DbSet<ClassAttendee> classAttendees { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Log> Logs { get; set; }

        public DataContext(DbContextOptions options) : base(options) { }

    }
}
