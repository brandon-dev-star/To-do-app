// /Interfaces/ITaskService.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using AngularWithASP.Server.Models;

namespace AngularWithASP.Server.Interfaces
{
    public interface ITaskService
    {
        Task<TaskItem> CreateTaskAsync(TaskItem newTask);
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
    }
}
