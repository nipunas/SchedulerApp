//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataAccess.DBAccess
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public User()
        {
            this.Tasks = new HashSet<Task>();
            this.TaskComments = new HashSet<TaskComment>();
        }
    
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public Nullable<bool> IsActive { get; set; }
    
        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<TaskComment> TaskComments { get; set; }
    }
}
