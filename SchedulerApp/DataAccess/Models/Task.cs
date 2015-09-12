using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public bool? Completed { get; set; }
        public DateTime DueDate { get; set; }
        public IEnumerable<User> Assignees { get; set; }
        public bool? IsArchived { get; set; }
    }
}