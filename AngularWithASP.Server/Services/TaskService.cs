using MongoDB.Driver;
using AngularWithASP.Server.Models;
using AngularWithASP.Server.Config;
using AngularWithASP.Server.Interfaces;
using MongoDB.Bson;

namespace AngularWithASP.Server.Services
{
    public class TaskService : ITaskService
    {
        private readonly IMongoCollection<TaskItem> _tasksCollection;

        public TaskService(MongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _tasksCollection = database.GetCollection<TaskItem>(settings.TasksCollectionName);
        }

        public async Task<TaskItem?> GetTaskByIdAsync(ObjectId id) =>
            await _tasksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<TaskItem> CreateTaskAsync(TaskItem newTask)
        {
            await _tasksCollection.InsertOneAsync(newTask);
            return newTask;
        }

        public async Task<TaskItem> UpdateTaskAsync(ObjectId id, TaskItem updatedTask)
        {
            // Find the task by its Id
            var existingTask = await _tasksCollection.Find(t => t.Id == id).FirstOrDefaultAsync();

            if (existingTask == null)
            {
                Console.WriteLine("not found");
                return null; // Return null if the task doesn't exist
            }

            // Update the task properties with the new values

            Console.WriteLine(updatedTask.IsCompleted);
            existingTask.Description = updatedTask.Description;
            existingTask.IsCompleted = !existingTask.IsCompleted;

            // Save the updated task to the database
            try
            {
                var result = await _tasksCollection.ReplaceOneAsync(t => t.Id == id, existingTask);
                return existingTask; // Return the updated task if the update was successful
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
   

            return null; // Return null if no task was updated
        }

        public async Task DeleteTaskAsync(ObjectId id) =>
            await _tasksCollection.DeleteOneAsync(x => x.Id == id);

        // Get all tasks
        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await _tasksCollection.Find(_ => true).ToListAsync();
        }
    }
}
