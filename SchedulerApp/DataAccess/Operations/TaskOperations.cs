using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess.Models;
using System.Data.SqlClient;
using DataAccess.DBAccess;
using DataAccess.Enums;

namespace DataAccess.Operations
{
    public class TaskOperations
    {
        public IEnumerable<TaskModel> GetTasksFor(TaskDuration duration)
        {
            SchedulerAppEntities entities = new SchedulerAppEntities();
            List<TaskModel> tasks;

            DateTime lastDayOfWeek = DateTime.Today.AddDays(7);

            if (duration == TaskDuration.Today)
            {
                tasks = entities.Tasks.Where(t=> t.DueDate == DateTime.Today).ToList().Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description
                }).ToList();
            }
            else if (duration == TaskDuration.Week)
            {
                tasks = entities.Tasks
                    .Where(t => t.DueDate >= DateTime.Today && t.DueDate <= lastDayOfWeek)
                    .ToList().Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description
                }).ToList();
            }
            else //Month
            {
                tasks = entities.Tasks.Where(t => t.DueDate.Value.Month == DateTime.Today.Month).ToList().Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description
                }).ToList();
            }

            //Add tasks without dueDate regardless of the filter
            List<TaskModel> tasksWithoutDueDate = entities.Tasks.Where(t => t.DueDate == null).ToList()
                .Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description
                }).ToList();

            tasks.AddRange(tasksWithoutDueDate);

            return tasks;
        }

        public void CreateTask(TaskModel taskModel)
        {
            Task task = new Task();
            task.Summary = taskModel.Summary;
            task.Description = taskModel.Description;

            SchedulerAppEntities entities = new SchedulerAppEntities();
            entities.Tasks.Add(task);
            entities.SaveChanges();

            int taskId = task.TaskId;
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
