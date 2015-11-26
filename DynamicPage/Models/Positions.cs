using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace DynamicPage.Models
{
    // This class is being serialized to XML
    [Serializable]
    [XmlRoot("Positions"), XmlType("Positions")] 
    public class Positions
    {
        public string Link { get; set; }
        public string Post { get; set; }
        public string Description { get; set; }
    }
}