import { IsBoolean, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  id: string;

  @IsString()
  body: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  parentId: string;
}
