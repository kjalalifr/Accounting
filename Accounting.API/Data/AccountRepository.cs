using System.Collections.Generic;
using System.Threading.Tasks;
using Accounting.API.Helper;
using Accounting.API.Helper.Params.Account;
using Accounting.API.Models.Account;
using Microsoft.EntityFrameworkCore;

namespace Accounting.API.Data
{

    public class AccountRepository : IAccountRepository
    {

        private readonly DataContext _context;
        public AccountRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
        public async Task<AccountGroup> GetAccountGroup(int id)
        {
            var accountGroup = await _context.AccountGroups.FirstOrDefaultAsync(u => u.Id == id);
            return accountGroup;
        }

        public async Task<PagedList<AccountGroup>> GetAccountGroupPagedList(AccountGroupParams accountGroupParams)
        {
            var accountGroups = _context.AccountGroups;
            return await PagedList<AccountGroup>.CreateAsync(accountGroups, 
                accountGroupParams.PageNumber, accountGroupParams.PageSize);
        }

        public async Task<IEnumerable<AccountGroup>> GetAllAccountGroup()
        {
            return await _context.AccountGroups.ToListAsync();
        }

        public async Task<bool> CheckGroupAccountExist(string code, string name)
        {
            var accountGroup = await _context.AccountGroups
                .FirstOrDefaultAsync(g => g.Code == code || g.Name == name);
            if (accountGroup != null)
                return true;
            
            return false;
        }
    }
}