using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MusicPlayer.Infrastructure;
using MusicPlayer.Models;
using System.Drawing;
using System.Drawing.Imaging;
using System.Net;

namespace MusicPlayer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongController : ControllerBase
    {
        private readonly MusicPlayerContext _context;
        private readonly ILogger<SongController> _logger;
        private readonly IWebHostEnvironment _env;

        public SongController(MusicPlayerContext context, ILogger<SongController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }
        //GET /song/
        [HttpGet()]
        public JsonResult Get()
        {
            _logger.LogDebug("IN GET SONG CONTROLLER");
            IQueryable<Song> items = from i in _context.Song orderby i.Id select i;
            List<Song> Songs = items.ToList();

            return new JsonResult(Songs);
        }
        //GET /song/Albums/GetAll
        [HttpGet()]
        [Route("{type}/GetAll")]
        public JsonResult GetAllByType(string type)
        {
            _logger.LogDebug("IN GetAllAlbums CONTROLLER");
            IQueryable<Song> items = from i in _context.Song orderby i.Id select i;
            var cards = items.GroupBy(s => type == "Albums" ? s.Album : s.Artist).Select(g => new
            {
                name = g.Key,
                Songs = g.ToList()
            }).ToList();

            return new JsonResult(cards);
        }

        //GET /song/Albums/{Name}
        [HttpGet()]
        [Route("{type}/{name}")]
        public JsonResult GetTypeByName(string type, string name)
        {
            _logger.LogDebug("IN GetAllAlbums CONTROLLER");
            IQueryable<Song> songs = from i in _context.Song
                                     where name == (type == "Albums" ? i.Album : i.Artist)
                                     orderby i.Id
                                     select i;

            return new JsonResult(songs);
        }

        //POST /song/
        [HttpPost]
        public JsonResult Add(Song item)
        {
            if (ModelState.IsValid)
            {
                _context.Add(item);
                _context.SaveChanges();
                return new JsonResult("The Song has been added!");
            }
            return new JsonResult("Cant Save file");
        }

        //Not used yet
        //PUT 
        [HttpPut]
        public JsonResult Edit(Song item)
        {

            if (ModelState.IsValid)
            {
                Song song = _context.Song.AsNoTracking().FirstOrDefault(x => x.Id == item.Id);
                if (song == null)
                {
                    return new JsonResult("The Song does not exist!");
                }
                else
                {
                    _context.Update(item);
                    _context.SaveChanges();
                    return new JsonResult("The song has been update!");
                }
            }
            return new JsonResult("The song Cannot be updated!");
        }

        //DELETE /song/
        [HttpDelete]
        public JsonResult Delete(Song item)
        {
            Song song = _context.Song.Find(item.Id);
            if (song == null)
            {
                return new JsonResult("The Song does not exist!");
            }
            else
            {
                _context.Song.Remove(item);
                _context.SaveChangesAsync();
            }
            return new JsonResult("The Song has been Deleted!");
        }

        //POST /song/SaveSound
        [HttpPost]
        [Route("SaveSound")]
        public JsonResult SaveSound()
        {
            try
            {
                var postedSound = Request.Form.Files[0];
                //FileBox.FileName.Split(".").Last.ToLower
                string soundName = postedSound.FileName.Split(".")[0] + ".mp3";
                var physicalPath = _env.ContentRootPath + "/ClientApp/public/Sounds/" + soundName;
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedSound.CopyTo(stream);
                }
                return new JsonResult(soundName);
            }
            catch (Exception ex)
            {
                return new JsonResult("error saving sound " + ex.StackTrace);
            }
        }
        //POST /song/saveImage
        [HttpPost()]
        [Route("saveImage")]
        public JsonResult SaveImage()
        {
            try
            {
                var postedImage = Request.Form.Files[0];
                string imageName = postedImage.FileName.Split(".")[0] + ".jpg";
                var filePath = Path.Combine(_env.ContentRootPath, "/ClientApp/public/Images/", postedImage.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    postedImage.CopyTo(fileStream);
                }
                return new JsonResult(imageName);
            }
            catch (Exception ex)
            {
                return new JsonResult("error saving image " + ex.StackTrace);
            }
        }
        //POST /song/saveBlobToImage
        [Route("SaveBlobToImage")]
        public JsonResult SaveBlobToImage([FromBody] image img)
        {
            try
            {
                // Convert the Base64 string to a byte array
                byte[] imageBytes = Convert.FromBase64String(img.baseString.Split(",")[1]);

                // Create a memory stream from the byte array
                using (MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
                {
                    // Convert the memory stream to an image
                    ms.Write(imageBytes, 0, imageBytes.Length);
                    Image image = Image.FromStream(ms, true);
                    var filePath = _env.ContentRootPath + "/ClientApp/public/Images/" + img.name +"."+ img.type;
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        image.Save(fileStream,image.RawFormat);
                    }
                    return new JsonResult("saved image " + image);
                }
            }
            catch (Exception ex)
            {
                return new JsonResult("error saving image " + ex.StackTrace);
            }
            finally
            {
                //SAVE with default default.jpg
            }

        }
    }
}
public class image
{
    public string? baseString { get; set; } = null;
    public String? name { get; set; } = "default";
    public String? type { get; set; } = "jpg";
}
