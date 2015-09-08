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
        public List<string> Tasks()
        {
            SchedulerAppEntities entities = new SchedulerAppEntities();

            var tasks =  entities.Tasks.ToList().Select(t => t.Summary).ToList();

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
