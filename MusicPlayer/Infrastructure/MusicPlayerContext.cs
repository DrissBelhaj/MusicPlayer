using Microsoft.EntityFrameworkCore;
using MusicPlayer.Models;

namespace MusicPlayer.Infrastructure
{
    public class MusicPlayerContext :DbContext
    {
        public MusicPlayerContext(DbContextOptions<MusicPlayerContext> options)
            : base(options)
        {

        }
        public DbSet<Song> Song { get; set; }
    }
}
