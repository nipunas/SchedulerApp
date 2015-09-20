using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using DataAccess.Models;
using DataAccess.Operations;
using DataAccess.Enums;

namespace SchedulerApp.Controllers
{
    public class TaskController : Controller
    {
        readonly TaskOperations oper = new TaskOperations();

        // GET: Tasks
        public JsonResult GetTasks(int duration, int userId)
        {
            List<TaskModel> tasks = oper.GetTasksFor((TaskDuration)duration).ToList();

            return Json(tasks, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetTask(int taskId, int userId)
        {
            return Json(oper.GetTask(taskId, userId), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateTask(TaskModel task)
        {
            return Json(oper.AddEditTask(task), JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public JsonResult EditTask(TaskModel task)
        {
            return Json(oper.AddEditTask(task), JsonRequestBehavior.DenyGet);
        }

        public void DeleteTask(int id)
        {
            oper.DeleteTask(id);
        }

        public void ChangeTaskStatus(int id, bool newState)
        {
            oper.ChangeTaskStatus(id, newState);
        }

        public JsonResult GetData()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["myConnString"].ConnectionString;
            TaskOperations operation = new TaskOperations();

            List<string> data = new List<string>();

            return Json(operation.GetTasks(connectionString, 1), JsonRequestBehavior.AllowGet);

        }
    }
}