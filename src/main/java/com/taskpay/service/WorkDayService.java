package com.taskpay.service;

import com.taskpay.domain.SalarySettings;
import com.taskpay.domain.WorkDayRecord;
import com.taskpay.repository.SalarySettingsRepository;
import com.taskpay.repository.WorkDayRecordRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkDayService {
    private final WorkDayRecordRepository workDayRecordRepository;
    private final SalarySettingsRepository salarySettingsRepository;

    public WorkDayService(
            WorkDayRecordRepository workDayRecordRepository,
            SalarySettingsRepository salarySettingsRepository) {
        this.workDayRecordRepository = workDayRecordRepository;
        this.salarySettingsRepository = salarySettingsRepository;
    }

    public List<WorkDayRecord> listByMonth(String monthKey) {
        return workDayRecordRepository.findByMonthKeyOrderByDateAsc(monthKey);
    }

    public WorkDayRecord save(LocalDate date, WorkDayRecord input) {
        if (input.isPaidLeave() && input.isUnpaidLeave()) {
            throw new IllegalArgumentException("Choose either paid leave or unpaid leave, not both.");
        }

        WorkDayRecord record = workDayRecordRepository.findByDate(date).orElseGet(WorkDayRecord::new);
        Instant now = Instant.now();
        record.setId(record.getId() == null ? "work_" + date : record.getId());
        record.setDate(date);
        record.setMonthKey(MonthKeys.fromDate(date));
        record.setWorked(input.isWorked());
        record.setHoursWorked(input.isWorked() ? safe(input.getHoursWorked(), defaultHours()) : BigDecimal.ZERO);
        record.setOvertimeHours(safe(input.getOvertimeHours(), BigDecimal.ZERO));
        record.setBonusAmount(safe(input.getBonusAmount(), BigDecimal.ZERO));
        record.setPaidLeave(input.isPaidLeave());
        record.setUnpaidLeave(input.isUnpaidLeave());
        record.setNote(input.getNote() == null ? "" : input.getNote());
        record.setUpdatedAt(now);
        if (record.getCreatedAt() == null) {
            record.setCreatedAt(now);
        }
        return workDayRecordRepository.save(record);
    }

    @Transactional
    public void deleteByDate(LocalDate date) {
        workDayRecordRepository.deleteByDate(date);
    }

    private BigDecimal defaultHours() {
        return salarySettingsRepository.findById(SalarySettings.DEFAULT_ID)
                .map(SalarySettings::getDefaultWorkingHours)
                .orElse(new BigDecimal("8"));
    }

    private BigDecimal safe(BigDecimal value, BigDecimal fallback) {
        return value == null ? fallback : value;
    }
}
