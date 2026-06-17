package com.taskpay.service;

import com.taskpay.api.NotFoundException;
import com.taskpay.domain.Task;
import com.taskpay.repository.TaskRepository;
import java.time.Instant;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> listActive() {
        return taskRepository.findByArchivedAtIsNullOrderByDueDateAscUpdatedAtDesc();
    }

    public Task save(Task input) {
        Instant now = Instant.now();
        Task task = input.getId() == null || input.getId().isBlank()
                ? Task.create()
                : taskRepository.findById(input.getId()).orElseGet(Task::create);
        if (input.getId() != null && !input.getId().isBlank()) {
            task.setId(input.getId());
        }
        task.setTitle(trimRequired(input.getTitle(), "Task title is required"));
        task.setDescription(input.getDescription());
        task.setDueDate(input.getDueDate());
        task.setReminderTime(input.getReminderTime());
        task.setRepeatRule(defaultString(input.getRepeatRule(), "none"));
        task.setCustomDays(input.getCustomDays());
        task.setPriority(defaultString(input.getPriority(), "medium"));
        task.setCategoryId(input.getCategoryId());
        task.setColor(defaultString(input.getColor(), "#0f766e"));
        task.setReminderSound(defaultString(input.getReminderSound(), "gentle"));
        task.setCompleted(input.isCompleted());
        task.setCompletedAt(input.isCompleted() ? (input.getCompletedAt() == null ? now : input.getCompletedAt()) : null);
        task.setArchivedAt(input.getArchivedAt());
        task.setUpdatedAt(now);
        if (task.getCreatedAt() == null) {
            task.setCreatedAt(now);
        }
        return taskRepository.save(task);
    }

    public Task toggle(String id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task not found"));
        boolean completed = !task.isCompleted();
        task.setCompleted(completed);
        task.setCompletedAt(completed ? Instant.now() : null);
        task.setUpdatedAt(Instant.now());
        return taskRepository.save(task);
    }

    public void delete(String id) {
        if (!taskRepository.existsById(id)) {
            throw new NotFoundException("Task not found");
        }
        taskRepository.deleteById(id);
    }

    @Transactional
    public long cleanupCompleted(int months) {
        Instant cutoff = Instant.now().minusSeconds(Math.max(1, months) * 31L * 24L * 60L * 60L);
        return taskRepository.deleteByCompletedTrueAndCompletedAtBefore(cutoff);
    }

    private String trimRequired(String value, String message) {
        if (value == null || value.trim().isBlank()) {
            throw new IllegalArgumentException(message);
        }
        return value.trim();
    }

    private String defaultString(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }
}
