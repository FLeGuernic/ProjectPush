using Autofac;
using PushNotification.API.Models;

namespace PushNotification.API
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new SubContext())
                    .As<ISubContext>()
                    .SingleInstance();
        }
    }
}
