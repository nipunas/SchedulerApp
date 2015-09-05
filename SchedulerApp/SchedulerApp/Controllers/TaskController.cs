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
        public JsonResult GetTasks(int id)
        {
            Task task1 = new Task() { Id = 1, Summary = "Clean the room", Description = "Commanding Officer of the ship, Commander Bill Waters paid a courtesy call on Commander Western Naval Area, Rear Admiral Dayananda Nanayakkara at the Western Naval Command Headquarters in Colombo, Navy headquarters said." };
            Task task2 = new Task() { Id = 2, Summary = "Sweep the floor", Description = "Use the switch statement to select one of many blocks of code to be executed." };
            Task task3 = new Task() { Id = 3, Summary = "Do Homework", Description = "When the JavaScript code interpreter reaches a break keyword, it breaks out of the switch block." };
            Task task4 = new Task() { Id = 2, Summary = "Sweep the floor", Description = "Use the switch statement to select one of many blocks of code to be executed." };
            Task task5 = new Task() { Id = 3, Summary = "Do Homework", Description = "When the JavaScript code interpreter reaches a break keyword, it breaks out of the switch block." };

            List<Task> tasks = new List<Task>() { task1, task2, task3, task4, task5 };

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