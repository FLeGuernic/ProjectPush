using System.Collections.Generic;

namespace PushNotification.API.Models
{
    public interface ISubContext
    {
        IList<SubItem> SubItems { get; }
    }

    public class SubContext : ISubContext
    {
        public IList<SubItem> SubItems { get; } = new List<SubItem>();
    }
}
