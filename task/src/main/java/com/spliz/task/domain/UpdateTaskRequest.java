package com.spliz.task.domain;

import com.spliz.task.domain.entity.TaskPriority;
import com.spliz.task.domain.entity.TaskStatus;

import java.time.LocalDate;

public record UpdateTaskRequest(
        String title,
        String description,
        LocalDate dueDate,
        TaskStatus status,
        TaskPriority priority
) {

}
