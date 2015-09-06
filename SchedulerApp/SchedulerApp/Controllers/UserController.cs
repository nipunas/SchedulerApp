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

        [HttpPost]
        public JsonResult Login(User user)
        {
            if (user.Name == "nipuna" && user.Password == "nipuna")
            {
                HttpCookie cookie = new HttpCookie("AppKey", Guid.NewGuid().ToString());
                Response.Cookies.Add(cookie);
                return Json(true, JsonRequestBehavior.DenyGet);
            }

            return Json(false, JsonRequestBehavior.DenyGet);
        }

        public JsonResult GetData()
        {
            User user = new User() { Id = 1, Name = "Nipuna", IsAdmin = true };
            return Json(user, JsonRequestBehavior.AllowGet);
        }
    }
}