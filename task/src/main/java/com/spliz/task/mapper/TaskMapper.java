package com.spliz.task.mapper;

import com.spliz.task.domain.CreateTaskRequest;
import com.spliz.task.domain.UpdateTaskRequest;
import com.spliz.task.domain.dto.CreateTaskRequestDto;
import com.spliz.task.domain.dto.TaskDto;
import com.spliz.task.domain.dto.UpdateTaskRequestDto;
import com.spliz.task.domain.entity.Task;

public interface TaskMapper {

    CreateTaskRequest fromDto(CreateTaskRequestDto dto);

    UpdateTaskRequest fromDto(UpdateTaskRequest dto);

    TaskDto toDto(Task task);


}
