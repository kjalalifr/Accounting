using System.ComponentModel.DataAnnotations;
using Accounting.API.Models.Base;

namespace Accounting.API.Models.Account
{
    public class AccountGeneral: BaseEntity
    {
        [Required]
        [MaxLength(1)]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public AccountGroup AccountGroup { get; set; }
        public int AccountGroupId { get; set; }
    }
}