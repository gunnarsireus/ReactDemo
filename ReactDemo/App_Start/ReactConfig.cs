using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ReactDemo.ReactConfig), "Configure")]

namespace ReactDemo
{
    public static class ReactConfig
    {
        public static void Configure()
        {
            ReactSiteConfiguration.Configuration
                .AddScript("~/js/3PP/Showdown.js")
                .AddScript("~/js/Tutorial.jsx")
                .AddScript("~/js/3PP/SetIntervalMixin.jsx");
        }
    }
}