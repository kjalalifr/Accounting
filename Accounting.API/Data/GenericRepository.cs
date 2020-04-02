using System.Linq;
using System.Threading.Tasks;
using Accounting.API.Helper;
using Accounting.API.Models.Base;
using Microsoft.EntityFrameworkCore;

namespace Accounting.API.Data
{

    public class GenericRepository<TEntity> : IGenericRepository<TEntity>
        where TEntity : BaseEntity
    {
        private readonly DataContext _dbContext;
    
        public GenericRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Create(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
            return await _dbContext.SaveChangesAsync()>0;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await GetById(id);
            _dbContext.Set<TEntity>().Remove(entity);
            return await _dbContext.SaveChangesAsync()>0;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsNoTracking();
        }
        
        public async Task<TEntity> GetById(int id)
        {
            return await _dbContext.Set<TEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<bool> Update(int id, TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}