package com.spliz.task.exception;

import java.util.UUID;

public class TaskNotFoundException extends RuntimeException {
    private final UUID id;

    public TaskNotFoundException(UUID id) {
        super("Task with id " + id + " not found");
        this.id = id;
    }

    public UUID getId() {
        return id;
    }
}
