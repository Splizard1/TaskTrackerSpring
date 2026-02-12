package com.spliz.task.mapper.impl;

import com.spliz.task.domain.CreateTaskRequest;
import com.spliz.task.domain.UpdateTaskRequest;
import com.spliz.task.domain.dto.CreateTaskRequestDto;
import com.spliz.task.domain.dto.TaskDto;
import com.spliz.task.domain.dto.UpdateTaskRequestDto;
import com.spliz.task.domain.entity.Task;
import com.spliz.task.mapper.TaskMapper;
import org.springframework.stereotype.Component;

@Component
public class TaskMapperImpl implements TaskMapper {
    @Override
    public CreateTaskRequest fromDto(CreateTaskRequestDto dto) {
        return new CreateTaskRequest(
                dto.title(),
                dto.description(),
                dto.dueDate(),
                dto.priority()
        );
    }

    @Override
    public UpdateTaskRequest fromDto(UpdateTaskRequest dto) {
        return new UpdateTaskRequest(
                dto.title(),
                dto.description(),
                dto.dueDate(),
                dto.status(),
                dto.priority()
        );
    }

    @Override
    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getPriority(),
                task.getStatus()
        );
    }
}
