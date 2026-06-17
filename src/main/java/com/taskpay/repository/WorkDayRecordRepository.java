package com.taskpay.repository;

import com.taskpay.domain.WorkDayRecord;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkDayRecordRepository extends JpaRepository<WorkDayRecord, String> {
    List<WorkDayRecord> findByMonthKeyOrderByDateAsc(String monthKey);

    Optional<WorkDayRecord> findByDate(LocalDate date);

    void deleteByDate(LocalDate date);
}
