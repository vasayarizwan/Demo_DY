using Demo_DY.DAL;
using Demo_DY.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo_DY.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private  readonly DyContext _context;
        public CustomerController(DyContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getCustomer")]
        public ActionResult getCustomers()
        {
            IEnumerable<Customer> customers = _context.Customers.ToList();
            return Ok(customers);
        }

        [Route("Add")]
        [HttpPost]
        public ActionResult Add(Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return Ok(customer);
        }

        [Route("Edit")]
        [HttpPost]
        public ActionResult Edit(Customer customer)
        {
            _context.Update(customer);
            _context.SaveChanges();
            return Ok(customer);
        }

        [Route("Delete/{id}")]
        public ActionResult Delete(int id)
        {
            Customer customer = _context.Customers.FirstOrDefault(x => x.CustomerId == id);
            _context.Customers.Remove(customer);
            _context.SaveChanges();
            return Ok(customer);
        }
    }
}
