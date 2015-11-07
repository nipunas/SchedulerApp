using System;

namespace DataAccess.Models
{
    public class TaskCommentModel
    {
        public int TaskId { get; set; }
        public int CommentId { get; set; }
        //public bool HasAttachment { get; set; }
        public string CommentText { get; set; }
        //public DateTime CreatedDateTime { get; set; }
        //public bool? IsDeleted { get; set; }
    }
}
