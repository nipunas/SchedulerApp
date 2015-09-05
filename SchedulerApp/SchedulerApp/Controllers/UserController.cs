using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAccess.Models;

namespace SchedulerApp.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetData()
        {
            User user = new User() { Id = 1, Name = "Nipuna", IsAdmin = true };
            return Json(user, JsonRequestBehavior.AllowGet);
        }
    }
}