using AvgSystem.App_Start.Handler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AvgSystem.Controllers
{
    public class GamePageController : App_Start.Handler.ControllerBase
    {
        public override ActionResult Index()
        {
            return View();
        }

        public ActionResult Detail(string id)
        {
            ViewBag.GameId = id;
            return View();
        }

        public ActionResult Play(string id)
        {
            ViewBag.GameId = id;
            return View();
        }

    }
}