using Newtonsoft.Json;

namespace PushNotification.API.Models
{
    [JsonObject(MemberSerialization.OptIn)]
    public class SubItem
    {
        //"1"
        [JsonProperty]
        public long Id { get; set; }
        ////"Toon"
        [JsonProperty]
        public string Name { get; set; }
        ////"Attendant"
        [JsonProperty]
        public string Function { get; set; }

        [JsonProperty]
        public string SubscriptionEndPoint { get; set; }

    }
}
