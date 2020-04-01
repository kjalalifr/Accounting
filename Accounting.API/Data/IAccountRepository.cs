using System.Collections.Generic;
using System.Threading.Tasks;
using Accounting.API.Helper;
using Accounting.API.Helper.Params.Account;
using Accounting.API.Models.Account;

namespace Accounting.API.Data
{
    public interface IAccountRepository : IBaseRepository
    {
         Task<PagedList<AccountGroup>> GetAccountGroupPagedList(AccountGroupParams accoutGroupParams);
         Task<AccountGroup> GetAccountGroup(int id);
         Task<IEnumerable<AccountGroup>> GetAllAccountGroup();
         Task<bool> CheckGroupAccountExist(string code, string name);
    }
}