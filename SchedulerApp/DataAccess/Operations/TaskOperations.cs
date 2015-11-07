using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess.Models;
using System.Data.SqlClient;
using DataAccess.DBAccess;
using DataAccess.Enums;

namespace DataAccess.Operations
{
    public class TaskOperations : Base
    {
        public IEnumerable<TaskModel> GetTasksFor(TaskDuration duration, int userId)
        {
            List<TaskModel> tasks;

            DateTime lastDayOfWeek = DateTime.Today.AddDays(7);

            if (duration == TaskDuration.Today)
            {
                tasks = entities.Tasks.Where(t=> t.DueDate == DateTime.Today).ToList().Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description,
                    Completed = t.Completed
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
                    Description = t.Description,
                    Completed = t.Completed
                }).ToList();
            }
            else //Month
            {
                tasks = entities.Tasks.Where(t => t.DueDate.Value.Month == DateTime.Today.Month).ToList().Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description,
                    Completed = t.Completed
                }).ToList();
            }

            //Add tasks without dueDate regardless of the filter
            List<TaskModel> tasksWithoutDueDate = entities.Tasks.Where(t => t.DueDate == null).ToList()
                .Select(t => new TaskModel()
                {
                    Id = t.TaskId,
                    Summary = t.Summary,
                    Description = t.Description,
                    Completed = t.Completed
                }).ToList();

            tasks.AddRange(tasksWithoutDueDate);

            return tasks;
        }

        public int CreateTask(TaskModel taskModel)
        {
            Task task = new Task();
            task.Summary = taskModel.Summary;
            task.Description = taskModel.Description;
            task.Completed = taskModel.Completed;
            task.CreatedUserId = taskModel.CreatedUserId;

            entities.Tasks.Add(task);
            entities.SaveChanges();

            return task.TaskId;
        }

        public int AddEditTask(TaskModel taskModel, int createdUserId)
        {
            taskModel.CreatedUserId = createdUserId;

            if (taskModel.Id == -1)
            {
                return CreateTask(taskModel);
            }
            else
            {
                return EditTask(taskModel);
            }
        }

        private int EditTask(TaskModel taskModel)
        {
            Task task = entities.Tasks.First(t => t.TaskId == taskModel.Id);

            task.Summary = taskModel.Summary;
            task.Description = taskModel.Description;

            SaveChanges();

            return task.TaskId;
        }

        public void DeleteTask(int id)
        {
            SchedulerAppEntities entities = new SchedulerAppEntities();

            Task task = entities.Tasks.First(t => t.TaskId == id);
            entities.Tasks.Remove(task);
            entities.SaveChanges();
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

        public IEnumerable<TaskCommentModel> GetTaskComments(int taskId)
        {
            List<TaskCommentModel> taskComments = new List<TaskCommentModel>();

            //taskComments = entities.TaskComments.Where(t => t.TaskId == taskId).Select(t => new TaskComment());

            return taskComments;
        }

        public void ChangeTaskStatus(int id, bool newState)
        {
            Task task = entities.Tasks.First(t => t.TaskId == id);
            task.Completed = newState;
            entities.SaveChanges();
        }

        public TaskModel GetTask(int taskId, int userId)
        {
            return entities.Tasks.First(t => t.TaskId == taskId).ToTaskModel();
        }

        public int CreateComment(TaskCommentModel comment, int userId)
        {
            Task task = entities.Tasks.First(t => t.TaskId == comment.TaskId);

            TaskComment newComment = entities.TaskComments.Create();
            newComment.CreatedUserId = userId;
            newComment.Comment = comment.CommentText;

            task.TaskComments.Add(newComment);
            SaveChanges();

            return newComment.CommentId;
        }
    }

    public static class TaskOperationMappers
    {
        public static TaskModel ToTaskModel(this Task task)
        {
            return new TaskModel
            {
                Id = task.TaskId,
                Summary = task.Summary,
                Description = task.Description,
                Completed = task.Completed,
                Comments = task.TaskComments.Select(t => new Models.TaskCommentModel
                {
                    CommentText = t.Comment,
                    CommentId = t.CommentId
                })
            };
        }
    }
}
