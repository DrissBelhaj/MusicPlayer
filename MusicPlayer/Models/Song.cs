namespace MusicPlayer.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Artist { get; set; }
        public string? Album { get; set; }
        public string? Genre { get; set; }
        public string? ImgSrc { get; set; }
        public string? SongSrc { get; set; }
        public int? ReleaseYear { get; set; }
        public float? Duration { get; set; }

    }
}
