using System.ComponentModel.DataAnnotations;

namespace Accounting.API.Dtos.Member
{
    public class UserForLogin
    {

        public string Username { get; set; }

        public string Password { get; set; }
    }
}