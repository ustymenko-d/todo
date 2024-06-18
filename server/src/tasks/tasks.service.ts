import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createNewTask(createTaskDto: CreateTaskDto) {
    try {
      return await this.prisma.tasks.create({
        data: createTaskDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllTasks() {
    try {
      return await this.prisma.tasks.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prisma.tasks.update({
        where: { id: id },
        data: updateTaskDto,
      });
    } catch (error) {
      console.log(error);
    }
  }

  findTaskById(id: string) {
    try {
      return this.prisma.tasks.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async toggleTaskStatus(id: string, targetTask: UpdateTaskDto) {
    try {
      return await this.prisma.tasks.update({
        where: { id: id },
        data: { completed: !targetTask.completed },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async removeTaskById(id: string) {
    try {
      return await this.prisma.tasks.delete({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
