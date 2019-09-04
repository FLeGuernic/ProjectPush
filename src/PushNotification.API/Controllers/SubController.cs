using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PushNotification.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace PushNotification.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubController : ControllerBase
    {

        private readonly ISubContext _context;

        public SubController(ISubContext context)
        {
            _context = context;
        }

        // GET: api/sub
        [HttpGet]
        public ActionResult<IEnumerable<SubItem>> GetSubItems()
        {
            return _context.SubItems.ToList();
        }

        // GET: api/sub/5
        [HttpGet("{id}")]
        public ActionResult<SubItem> GetSubItem(long id)
        {
            var subItem = _context.SubItems.Single(e => e.Id == id);

            return subItem;
        }

        // POST: api/sub
        [HttpPost]
        public ActionResult<SubItem> PostSubItem(SubItem item)
        {
            _context.SubItems.Add(item);

            return item;
        }

        // DELETE: api/sub/5
        [HttpDelete("{id}")]

        public ActionResult<SubItem> DeleteSubItem(long id)
        {
            var subItem = _context.SubItems.Single(e => e.Id == id);
            _context.SubItems.Remove(subItem);
            return subItem;
        }
    }
}
