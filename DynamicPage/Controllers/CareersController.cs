using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;
using DynamicPage.Models;
using DynamicPage.ViewModel;

namespace DynamicPage.Controllers
{
    public class CareersController : Controller
    {
        // GET: Careers
        public ActionResult Careers()
        {

            CareersData viewModel = new CareersData(); // ViewModel object
            DataSet dsTeamPlayers = new DataSet();//Using dataset to read Team-Players xml file 
            string xmlData = Server.MapPath("~/App_Data/Team-Players.xml");//Path of the xml script


            DataSet dsSliderImages = new DataSet();//Using dataset to read Slider-Images xml file 
            string xmlSliderImages = Server.MapPath("~/App_Data/Slider-Images.xml"); //Path of the xml script


            DataSet dsPositions = new DataSet();//Using dataset to read Positions xml file 
            string xmlPositions = Server.MapPath("~/App_Data/Positions.xml");//Path of the xml script


            // If the cache is empty read data from xml file and insert it into the cache else retrieve it from the cache
            if (HttpRuntime.Cache["TeamPlayers"] == null)
            {

                dsTeamPlayers.ReadXml(xmlData);
                HttpRuntime.Cache.Insert("TeamPlayers", dsTeamPlayers, new CacheDependency(xmlData), DateTime.Now.AddSeconds(120), System.Web.Caching.Cache.NoSlidingExpiration);

            }
            else
            {
                 dsTeamPlayers = (DataSet)HttpRuntime.Cache["TeamPlayers"];
            }


            if (HttpRuntime.Cache["SliderImages"] == null)
            {

                dsSliderImages.ReadXml(xmlSliderImages);
                HttpRuntime.Cache.Insert("SliderImages", dsSliderImages, new CacheDependency(xmlSliderImages), DateTime.Now.AddSeconds(120), System.Web.Caching.Cache.NoSlidingExpiration);
            }
            else
            {
                  dsSliderImages = (DataSet)HttpRuntime.Cache["SliderImages"];

            }

            if (HttpRuntime.Cache["Positions"] == null)
            {

                dsPositions.ReadXml(xmlPositions);
                HttpRuntime.Cache.Insert("Positions", dsPositions, new CacheDependency(xmlPositions), DateTime.Now.AddSeconds(120), System.Web.Caching.Cache.NoSlidingExpiration);
            }
            else
            {

                dsPositions = (DataSet)HttpRuntime.Cache["Positions"];
           }

            viewModel.TeamPlayers = (from rows in dsTeamPlayers.Tables[0].AsEnumerable() //Fetch the records from the dataset teamplayers
                           select new TeamPlayers
                           {
                               Image = rows[0].ToString(),
                               Name = rows[1].ToString(),
                               Designation = rows[2].ToString()

                           }).ToList();

            viewModel.SliderImages = (from rows in dsSliderImages.Tables[0].AsEnumerable() //Fetch the records from the dataset sliderImages
                            select new SliderImages
                            {
                                Picture = rows[0].ToString()
                            }).ToList();

            viewModel.Positions = (from rows in dsPositions.Tables[0].AsEnumerable() //Fetch the records from the dataset positions
                                   select new Positions
                                      {
                                          Link = rows[0].ToString(),
                                          Post = rows[1].ToString(),
                                          Description = rows[2].ToString()
                                      }).ToList();


            return View(viewModel);
       


        }
    }
}