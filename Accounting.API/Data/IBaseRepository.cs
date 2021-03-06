using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accounting.API.Data
{
    public interface IBaseRepository
    {
        void Add<T>(T entity) where T:class;
        void Delete<T>(T entity) where T:class;
        Task<bool> SaveAll();
    }
}