package com.taskpay.repository;

import com.taskpay.domain.Task;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {
    List<Task> findByArchivedAtIsNullOrderByDueDateAscUpdatedAtDesc();

    long deleteByCompletedTrueAndCompletedAtBefore(Instant cutoff);

    List<Task> findByCompletedFalseAndArchivedAtIsNullAndDueDateGreaterThanEqual(LocalDate date);
}
