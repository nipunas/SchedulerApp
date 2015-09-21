using System.Web.SessionState;
using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace DataAccess.Security
{
    public static class HttpUserData
    {
        private const string UserSessionKey = "AuthUser";
        private const string UserName = "UserName";
        private const string UserProfile = "UserProfile";

        private static HttpSessionState GetSession()
        {
            return HttpContext.Current.Session;
        }

        public static UserModel Get()
        {
            HttpSessionState session = GetSession();

            if(session!= null)
            {
                return session[UserSessionKey] as UserModel;
            }
            else
            {
                return null;
            }
        }

        public static void Abandon()
        {
            HttpUserData.Abandon();

            //HttpSessionState session = GetSession();

            //if(session!= null)
            //{
            //    session.Abandon();
            //}
        }

        public static void Store(UserModel profile)
        {
            HttpSessionState session = GetSession();

            if (session != null)
            {
                session[UserSessionKey] = profile;
                session[UserName] = profile.Name;
            }
        }
    }
}
