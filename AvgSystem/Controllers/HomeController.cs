using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace AvgSystem
{
    public class HomeController : Controller
    {
        //TrainApp trainBll = new TrainApp();
        public  ActionResult Index()
        {

            return View();
        }
        public ActionResult Default()
        {
            return View();
        }
        [HttpGet]
        public ActionResult About()
        {
            return View();
        }

        //public ActionResult GetEmployPositionList()
        //{
        //    TestClass test = new TestClass();

        //    return Content(test.GetEmployPositionList().ToJson());
        //}


    }
}
