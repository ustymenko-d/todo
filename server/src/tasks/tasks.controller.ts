import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createNewTask(createTaskDto);
  }

  @Get('all')
  getAll() {
    return this.tasksService.getAllTasks();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Patch(':id')
  async toggleStatus(@Param('id') id: string) {
    const targetTask = await this.tasksService.findTaskById(id);

    return this.tasksService.toggleTaskStatus(id, targetTask);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.removeTaskById(id);
  }
}
