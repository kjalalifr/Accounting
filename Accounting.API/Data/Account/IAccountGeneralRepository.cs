using System.Threading.Tasks;
using Accounting.API.Helper;
using Accounting.API.Helper.Params.Account;
using Accounting.API.Models.Account;

namespace Accounting.API.Data.Account
{
    public interface IAccountGeneralRepository:IGenericRepository<AccountGeneral>
    {
         Task<PagedList<AccountGeneral>> GetAccountGeneralPagedList(AccountGeneralParams accoutGeneralParams);
         Task<bool> CheckAccountGeneralExist(string code, string name);
    }
}