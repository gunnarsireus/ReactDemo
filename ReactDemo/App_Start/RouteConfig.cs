using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ReactDemo
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
            name: "Comments",
            url: "comments",
            defaults: new { controller = "Home", action = "Comments" }
           );

            routes.MapRoute(
            name: "NewComment",
            url: "comments/new",
            defaults: new { controller = "Home", action = "AddComment" }
            );

            routes.MapRoute(
            name: "EditComment",
            url: "comments/edit/{id}",
            defaults: new { controller = "Home", action = "EditComment", id = UrlParameter.Optional }
            );

            routes.MapRoute(
            name: "DeleteComment",
            url: "comments/delete/{id}",
            defaults: new { controller = "Home", action = "DeleteComment", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
