using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DynamicPage.Models;

namespace DynamicPage.ViewModel
{
    public class CareersData
    {
        public List<TeamPlayers> TeamPlayers { get; set; }

        public List<SliderImages> SliderImages { get; set; }

        public List<Positions> Positions { get; set; }
    }
}