using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Demo_DY.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; }
        public DateTime DateofBirth { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string BusinessName { get; set; }
        //[SqlDefaultValue(DefaultValue = "GETUTCDATE()")]
        public DateTime CreatedDate { get; set; }
    }
}
