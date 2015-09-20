using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class DataAccessBase
    {
        public SqlDataReader AccessDB(string connectionString, string sqlCommand)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(sqlCommand, conn))
                {
                    return cmd.ExecuteReader();
                }
            }
        }

    }
}
