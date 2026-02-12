package com.spliz.task.domain;

import com.spliz.task.domain.entity.TaskPriority;


import java.time.LocalDate;


public record CreateTaskRequest(
        String title,
        String description,
        LocalDate dueDate,
        TaskPriority priority
) {
}
