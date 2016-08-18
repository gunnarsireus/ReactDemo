using System.Web;
using System.Web.Optimization;
using System.Web.Optimization.React;

namespace ReactDemo
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new BabelBundle("~/bundles/main").Include(
                "~/Scripts/Tutorial.jsx",
                "~/Scripts/showdown.js",
                "~/Scripts/SetIntervalMixin.jsx"
            ));

            // Forces files to be combined and minified in debug mode
            // Only used here to demonstrate how combination/minification works
            // Normally you would use unminified versions in debug mode.
            BundleTable.EnableOptimizations = false;
        }
    }
}
