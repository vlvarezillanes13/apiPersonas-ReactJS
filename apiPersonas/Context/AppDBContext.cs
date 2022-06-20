using apiPersonas.Models;
using Microsoft.EntityFrameworkCore;

namespace apiPersonas.Context
{
    public class AppDBContext :DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }

        public DbSet<Personas_BD> persona { get; set; }
    }
}
