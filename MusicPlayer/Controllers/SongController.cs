using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MusicPlayer.Infrastructure;
using MusicPlayer.Models;

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
           List<Song> Songs =  items.ToList();

           return new JsonResult(Songs);
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
                else { 
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
            if (item == null)
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

        //POST /sounds
        [Route("SaveSound")]
        [HttpPost]
        public JsonResult SaveSound()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedSound = httpRequest.Files[0];
                //FileBox.FileName.Split(".").Last.ToLower
                string soundName = postedSound.FileName.Split(".")[0]+".mp3";
                var physicalPath = _env.ContentRootPath + "/ClientApp/public/Sounds/"+ soundName;
                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedSound.CopyTo(stream);
                }
                return new JsonResult(soundName);
            }
            catch (Exception ex)
            {
                return new JsonResult("error saving sound "+ ex.StackTrace);
            }
        }
    }
}
