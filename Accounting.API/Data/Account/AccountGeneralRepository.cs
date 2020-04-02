using System.Threading.Tasks;
using Accounting.API.Helper;
using Accounting.API.Helper.Params.Account;
using Accounting.API.Models.Account;
using Microsoft.EntityFrameworkCore;

namespace Accounting.API.Data.Account
{
    public class AccountGeneralRepository : GenericRepository<AccountGeneral>, IAccountGeneralRepository
    {
        private readonly DataContext _dbContext;
        public AccountGeneralRepository(DataContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CheckAccountGeneralExist(string code, string name)
        {
            var accountGeneral = await _dbContext.AccountGenerals
                .FirstOrDefaultAsync(g => g.Code == code || g.Name == name);
            if (accountGeneral != null)
                return true;
            
            return false;
        }

        public async Task<PagedList<AccountGeneral>> GetAccountGeneralPagedList(AccountGeneralParams accountGeneralParams)
        {
            var accountGeneral = _dbContext.AccountGenerals;
            return await PagedList<AccountGeneral>.CreateAsync(accountGeneral,
            accountGeneralParams.PageNumber, accountGeneralParams.PageSize);
        }
    }
}