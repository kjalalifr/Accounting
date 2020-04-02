using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Accounting.API.Data.Account;
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
    public class AccountGeneralController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAccountGeneralRepository _repo;
        public AccountGeneralController(IMapper mapper, IAccountGeneralRepository repo)
        {
            _repo = repo;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]AccountGeneralParams accountGeneralParams)
        {
            var accountGenerals = await _repo.GetAccountGeneralPagedList(accountGeneralParams);

            Response.AddPagination(accountGenerals.CurrentPage, accountGenerals.PageSize,
                 accountGenerals.TotalCount, accountGenerals.TotalPages);

            return Ok(accountGenerals);

        }

        [HttpGet("{id}", Name = "GetAccountGeneral")]
        public async Task<IActionResult> GetById(int id)
        {
            var accountGeneral = await _repo.GetById(id);
            return Ok(accountGeneral);
        }

        [HttpPut("{userId}/update/{id}")]
        public async Task<IActionResult> Update(int id, int userId, AccountGeneralForUpdateDto accountGeneralForUpdate)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            accountGeneralForUpdate.ModifiedBy = userId;
            accountGeneralForUpdate.ModifyDate = DateTime.Now;
            
            var accountFromRepo = await _repo.GetById(id);

            if (accountFromRepo == null)
                return BadRequest("record not found");


            _mapper.Map(accountGeneralForUpdate,accountFromRepo);

            if (await _repo.Update(id,accountFromRepo))
                return NoContent();

            throw new Exception($"Updating account group {id} failed on save");
        }

        [HttpPost("{userId}/delete/{id}")]
        public async Task<IActionResult> Delete(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var accountFromRepo = await _repo.GetById(id);

            if (accountFromRepo == null)
                return BadRequest("record not found");

            if (await _repo.Delete(id))
                return NoContent();

            throw new Exception("Error deleting the message");

        }

        [HttpPost("{userId}/new")]
        public async Task<IActionResult> New(int userId, AccountGeneral accountGeneral)
        {
            accountGeneral.CreatedBy=userId;
            accountGeneral.CreatedDate=DateTime.Now;

            var exist = await _repo.CheckAccountGeneralExist(accountGeneral.Code,accountGeneral.Name);

            if (exist)
            {
                return BadRequest("Account already exist! Code or Name is dupplicated");   
            } 
            else
            {
                            
                if (await _repo.Create(accountGeneral))
                    return NoContent();

                throw new Exception("Error creating the new account!");
            }

        }
    }
}