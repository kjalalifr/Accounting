using System;

namespace Accounting.API.Dtos.Account
{
    public class AccountGeneralForUpdateDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public DateTime ModifyDate { get; set; }
        public int ModifiedBy { get; set; }
        public int AccountGroupId { get; set; }
    }
}