using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace DynamicPage.Models
{

    // This class is being serialized to XML
    [Serializable]
    [XmlRoot("Team-Players"), XmlType("Team-Players")]  
    public class TeamPlayers
    {
        public string Image { get; set; }

        public string Name { get; set; }

        public string Designation { get; set; }

    }
}