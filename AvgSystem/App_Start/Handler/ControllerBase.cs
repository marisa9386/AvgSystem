﻿using AvgSystem.App_Start.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AvgSystem.App_Start.Handler
{
    public abstract class ControllerBase : Controller
    {

        //public Log FileLog
        //{
        //    get { return LogFactory.GetLogger(this.GetType().ToString()); }
        //}
        [HttpGet]
        //[HandlerAuthorize]
        public virtual ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        //[HandlerAuthorize]
        public virtual ActionResult Form()
        {
            return View();
        }
        [HttpGet]
        //[HandlerAuthorize]
        public virtual ActionResult Details()
        {
            return View();
        }
        protected virtual ActionResult Success(string message)
        {
            return Content(new AjaxResult { state = ResultType.success.ToString(), message = message }.ToJson());
        }
        protected virtual ActionResult Success(string message, object data)
        {
            return Content(new AjaxResult { state = ResultType.success.ToString(), message = message, data = data }.ToJson());
        }
        protected virtual ActionResult Error(string message)
        {
            return Content(new AjaxResult { state = ResultType.error.ToString(), message = message }.ToJson());
        }

    }
}