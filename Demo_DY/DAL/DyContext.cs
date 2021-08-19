using System;
using Microsoft.EntityFrameworkCore;
using Demo_DY.Models;

namespace Demo_DY.DAL
{
    public class DyContext:DbContext
    {
        public DyContext(DbContextOptions options)
         : base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .Property(b => b.CreatedDate)
                .HasDefaultValueSql("GETUTCDATE()");
        }
    }
}
