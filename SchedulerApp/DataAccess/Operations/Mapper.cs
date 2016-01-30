using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataAccess.DBAccess;

namespace DataAccess.Operations
{
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
