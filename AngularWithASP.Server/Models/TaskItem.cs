using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AngularWithASP.Server.Models
{
    public class TaskItem
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("description")]
        public required string Description { get; set; }

        [BsonElement("completed")]
        public bool IsCompleted { get; set; }

        [BsonIgnore]
        public string StringId => Id.ToString();
    }
}
