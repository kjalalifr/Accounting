using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Accounting.API.Data;
using Accounting.API.Dtos.Account;
using Accounting.API.Helper;
using Accounting.API.Helper.Params.Account;
using Accounting.API.Models.Account;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Accounting.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepository _repo;
        private readonly IMapper _mapper;
        public AccountsController(IAccountRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("accountgroup")]
        public async Task<IActionResult> GetAllAccountGroup([FromQuery]AccountGroupParams accountGroupParams)
        {
            var accountGroups = await _repo.GetAccountGroupPagedList(accountGroupParams);

            Response.AddPagination(accountGroups.CurrentPage, accountGroups.PageSize,
                 accountGroups.TotalCount, accountGroups.TotalPages);

            return Ok(accountGroups);

        }

        [HttpGet("accountgroup/{id}", Name = "GetAccountGroup")]
        public async Task<IActionResult> GetAccountGroup(int id)
        {
            var accountGroup = await _repo.GetAccountGroup(id);
            return Ok(accountGroup);
        }

        [HttpPut("accountgroup/{userId}/update/{id}")]
        public async Task<IActionResult> UpdateAccountGroup(int id, int userId, AccountGroupForUpdateDto accountGroupForUpdate)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            accountGroupForUpdate.ModifiedBy = userId;
            accountGroupForUpdate.ModifyDate = DateTime.Now;
            
            var accountFromRepo = await _repo.GetAccountGroup(id);


            _mapper.Map(accountGroupForUpdate,accountFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating account group {id} failed on save");
        }

        
        [HttpPost("accountgroup/{userId}/delete/{id}")]
        public async Task<IActionResult> DeleteAccountGroup(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var accountGroupFromRepo = await _repo.GetAccountGroup(id);

            if (accountGroupFromRepo == null)
                return BadRequest("record not found");

             _repo.Delete(accountGroupFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error deleting the message");

        }

        [HttpPost("accountgroup/{userId}/new")]
        public async Task<IActionResult> NewAccountGroup(int userId, AccountGroup accountGroup)
        {
            accountGroup.CreatedBy=userId;
            accountGroup.CreatedDate=DateTime.Now;

            var exist = await _repo.CheckGroupAccountExist(accountGroup.Code,accountGroup.Name);

            if (exist)
            {
                return BadRequest("Account already exist! Code or Name is dupplicated");   
            } 
            else
            {
                _repo.Add<AccountGroup>(accountGroup);
            
                if (await _repo.SaveAll())
                    return NoContent();

                throw new Exception("Error creating the new account!");
            }

        }

    }
}