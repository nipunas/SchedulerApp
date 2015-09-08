using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess.Models;
using System.Data.SqlClient;
using DataAccess.DBAccess;

namespace DataAccess.Operations
{
    public class TaskOperations
    {
        public IEnumerable<TaskModel> GetTasksFor(int duration)
        {
            SchedulerAppEntities entities = new SchedulerAppEntities();
            IEnumerable<TaskModel> tasks;
            if (duration == 1)
            {
                tasks = entities.Tasks.Where(t=> t.DueDate == DateTime.Today).ToList().Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description
                }).ToList();
            }
            else if (duration == 2 || duration == 3)
            {
                tasks = entities.Tasks.ToList().Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description
                }).ToList();
            }
            else
            {
                tasks = entities.Tasks.Where(t => t.DueDate > DateTime.Today).ToList().Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description
                }).ToList();
            }

            return tasks;
        }

        public IEnumerable<string> GetTasks(string conn, int id)
        {
            List<string> data = new List<string>();

            DataAccessBase dbReader = new DataAccessBase();
            SqlDataReader reader = dbReader.AccessDB(conn, "SELECT * FROM Employee");

            while (reader.Read())
            {
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    data.Add(reader.GetValue(i).ToString());
                    Console.WriteLine(reader.GetValue(i));
                }
                Console.WriteLine();
            }

            return data;

        }
    }
}
