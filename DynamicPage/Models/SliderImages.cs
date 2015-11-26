using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace DynamicPage.Models
{
    // This class is being serialized to XML
    [Serializable]
    [XmlRoot("Slider-Images"), XmlType("Slider-Images")] 
    public class SliderImages
    {
        public string Picture { get; set; }
    }
}