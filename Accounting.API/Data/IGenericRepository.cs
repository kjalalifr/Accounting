using System;
using System.Linq;
using System.Threading.Tasks;
using Accounting.API.Models.Base;

namespace Accounting.API.Data
{
    public interface IGenericRepository<TEntity>
    where TEntity : BaseEntity
    {
        IQueryable<TEntity> GetAll();
        Task<TEntity> GetById(int id);
        Task<bool> Create(TEntity entity);
        Task<bool> Update(int id, TEntity entity);
        Task<bool> Delete(int id);
    }
}