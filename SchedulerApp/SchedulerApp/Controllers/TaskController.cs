using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using DataAccess.Models;
using DataAccess.Operations;

namespace SchedulerApp.Controllers
{
    public class TaskController : Controller
    {
        // GET: Tasks
        public JsonResult GetTasks(int duration, int userId)
        {
            TaskOperations oper = new TaskOperations();
            List<TaskModel> tasks = oper.GetTasksFor(duration).ToList();

            return Json(tasks, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetData()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["myConnString"].ConnectionString;
            string sqlCommand = "SELECT * FROM Employee";


            TaskOperations operation = new TaskOperations();

            List<string> data = new List<string>();

            //using (SqlConnection conn = new SqlConnection(connectionString))
            //{
            //    conn.Open();
            //    using (SqlCommand cmd = new SqlCommand(sqlCommand, conn))
            //    {
            //        using(SqlDataReader reader = cmd.ExecuteReader())
            //        {
            //            while(reader.Read())
            //            {
            //                for (int i = 0; i < reader.FieldCount; i++)
            //                {
            //                    data.Add(reader.GetValue(i).ToString());
            //                    Console.WriteLine(reader.GetValue(i));
            //                }
            //                Console.WriteLine();
            //            }
            //        }
            //    }
            //}

            return Json(operation.GetTasks(connectionString, 1), JsonRequestBehavior.AllowGet);

        }
    }
}