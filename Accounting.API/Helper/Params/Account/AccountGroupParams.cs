namespace Accounting.API.Helper.Params.Account
{
    public class AccountGroupParams
    {
        private const int MaxPageSize=50;
        public int PageNumber { get; set; }=1;
        private int pageSize=10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value>MaxPageSize) ? MaxPageSize: value; }
        }

        public int AccountGroupId { get; set; }
        public string Name { get; set; }
        public string OrderBy { get; set; }
        
    }
}