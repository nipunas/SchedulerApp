using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchedulerApp.Controllers
{
    public class TestController : Controller
    {
        //http://www.asp.net/mvc/overview/older-versions-1/unit-testing/creating-unit-tests-for-asp-net-mvc-applications-cs
        public string GetValue(int id)
        {
            return id + " ad";
        }

	}
}