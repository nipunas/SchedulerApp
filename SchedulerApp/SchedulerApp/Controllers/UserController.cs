using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataAccess.Models;
using DataAccess.Operations;
using DataAccess.Security;

namespace SchedulerApp.Controllers
{
    public class UserController : Controller
    {
        readonly UserOperations userOperations = new UserOperations();

        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(UserModel user)
        {
            bool isValidUser;
            user = userOperations.IsValidUser(out isValidUser, user);

            if (isValidUser)
            {
                HttpUserData.Store(user);

                //HttpCookie cookie = new HttpCookie("AppKey", Guid.NewGuid().ToString());
                //Response.Cookies.Add(cookie);
                return Json(true, JsonRequestBehavior.DenyGet);
            }

            return Json(false, JsonRequestBehavior.DenyGet);
        }

        public void LogOut()
        {
            Session.Abandon();
        }

        public JsonResult GetData()
        {
            UserModel user = new UserModel() { Id = 1, Name = "Nipuna", IsAdmin = true };
            return Json(user, JsonRequestBehavior.AllowGet);
        }
    }
}