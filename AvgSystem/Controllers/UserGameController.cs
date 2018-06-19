using AvgSystem.App_Start.Handler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AvgSystem.Controllers
{
    public class UserGameController : App_Start.Handler.ControllerBase
    {
        public override ActionResult Index()
        {
            return View();
        }

        public ActionResult UpdateGame(string id)
        {
            ViewBag.GameId = id;
            if (id == "-1")
            {
                ViewBag.actmsg = "save";
            }
            else
            {
                ViewBag.actmsg = "update";
            }
            return View();
        }

        public ActionResult GameSection(string id)
        {
            ViewBag.GameId = id;
            return View();
        }

        public ActionResult UpdateSection(string id, string gid)
        {
            ViewBag.GameId = gid;
            ViewBag.SectionId = id;
            if (id == "-1")
            {
                ViewBag.actmsg = "save";
            }
            else
            {
                ViewBag.actmsg = "update";
            }
            return View();
        }

    }
}
