using AngularWithASP.Server.Models;
using AngularWithASP.Server.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace AngularWithASP.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(ObjectId id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskItem newTask)
        {
            if (newTask == null || string.IsNullOrWhiteSpace(newTask.Description))
            {
                return BadRequest("Task description is required.");
            }

            Console.WriteLine($"Received task: {newTask.Description}");  // Add log here to verify the request

            var createdTask = await _taskService.CreateTaskAsync(newTask);

            Console.WriteLine($"Received task: {newTask.Id}");  // Add log here to verify the request

            var response = new
            {
                id = createdTask.Id.ToString(),
                description = createdTask.Description,
                isCompleted = createdTask.IsCompleted
            };

            return CreatedAtAction(nameof(GetAllTasks), new { id = response.id}, response);
            //return Ok(createdTask);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(ObjectId id, [FromBody] TaskItem updatedTask)
        {

            Console.WriteLine($"Received task: {updatedTask.Description}");  // Add log here to verify the request
            Console.WriteLine($"Received Id: {id.ToString()}");  // Add log here to verify the request
            if (updatedTask == null || string.IsNullOrWhiteSpace(updatedTask.Description))
            {
                return BadRequest("Task description is required.");
            }

            var task = await _taskService.UpdateTaskAsync(id, updatedTask);

            if (task == null)
            {
                return NotFound("Task not found.");
            }

            return Ok(task); // Return the updated task
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(ObjectId id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);

            if (task == null)
                return NotFound();

            await _taskService.DeleteTaskAsync(id);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();

            // Optionally, you can use LINQ to project the tasks to a specific format if necessary
            // for example, if you want to explicitly convert ObjectId to string, but it's usually handled automatically
            var taskList = tasks.Select(task => new
            {
                id = task.Id.ToString(),
                description = task.Description,
                isCompleted = task.IsCompleted
            }).ToList();

            return Ok(taskList);
        }
    }
}
