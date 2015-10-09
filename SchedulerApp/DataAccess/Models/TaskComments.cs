using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class TaskComments
    {
        public int TaskId { get; set; }
        public int CommentId { get; set; }
        public bool HasAttachment { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
