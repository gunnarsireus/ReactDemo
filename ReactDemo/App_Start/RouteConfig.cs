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
                "Comments",
                "comments",
                new {controller = "Home", action = "Comments"}
                );

            routes.MapRoute(
                "NewComment",
                "comments/new",
                new {controller = "Home", action = "AddComment"}
                );

            routes.MapRoute(
                "EditComment",
                "comments/edit/{id}",
                new {controller = "Home", action = "EditComment", id = UrlParameter.Optional}
                );

            routes.MapRoute(
                "DeleteComment",
                "comments/delete/{id}",
                new {controller = "Home", action = "DeleteComment", id = UrlParameter.Optional}
                );

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new {controller = "Home", action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}