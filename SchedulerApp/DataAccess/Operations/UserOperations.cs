using System.Collections.Generic;
using System.Linq;
using DataAccess.DBAccess;
using DataAccess.Models;
using System;

namespace DataAccess.Operations
{
    public class UserOperations : Base
    {
        public UserModel IsValidUser(out bool isValidUser, UserModel userModel)
        {
            User user = entities.Users.FirstOrDefault(u => u.Name == userModel.Name && u.Password == userModel.Password);
            
            if (user != null)
            {
                userModel.Id = user.UserId;
                isValidUser = user.IsActive.GetValueOrDefault(false);
            }
            else
            {
                userModel.Id = -1;
                isValidUser = false;
            }

            return userModel;
        }

        public int CreateUser(UserModel model)
        {
            User user = entities.Users.Create();

            user.Name = model.Name;
            user.Password = model.Password;

            entities.Users.Add(user);

            return user.UserId;
        }

        public void DeleteUser(int userId)
        {
            User user = entities.Users.First(u => u.UserId == userId);
            entities.Users.Remove(user);
        }
    }
}
