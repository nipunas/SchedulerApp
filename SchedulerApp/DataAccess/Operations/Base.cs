using DataAccess.DBAccess;

namespace DataAccess.Operations
{
    public abstract class Base
    {
        protected readonly SchedulerAppEntities entities;

        public Base()
        {
            entities = new SchedulerAppEntities();
        }

        public int SaveChanges()
        {
            return entities.SaveChanges();
        }
    }
}
