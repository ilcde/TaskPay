package com.taskpay.service;

import com.taskpay.domain.SalarySettings;
import com.taskpay.domain.WorkDayRecord;
import com.taskpay.repository.SalarySettingsRepository;
import com.taskpay.repository.WorkDayRecordRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.YearMonth;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SalaryService {
    private final SalarySettingsRepository salarySettingsRepository;
    private final WorkDayRecordRepository workDayRecordRepository;

    public SalaryService(
            SalarySettingsRepository salarySettingsRepository,
            WorkDayRecordRepository workDayRecordRepository) {
        this.salarySettingsRepository = salarySettingsRepository;
        this.workDayRecordRepository = workDayRecordRepository;
    }

    public SalarySummary summarize(String monthKey) {
        SalarySettings settings = salarySettingsRepository.findById(SalarySettings.DEFAULT_ID)
                .orElseThrow(() -> new IllegalStateException("Salary settings not found"));
        List<WorkDayRecord> records = workDayRecordRepository.findByMonthKeyOrderByDateAsc(monthKey);
        return summarize(settings, records, monthKey);
    }

    public SalarySummary summarize(SalarySettings settings, List<WorkDayRecord> records, String monthKey) {
        YearMonth month = MonthKeys.parse(monthKey);
        int daysInMonth = month.lengthOfMonth();
        int workedDays = (int) records.stream().filter(WorkDayRecord::isWorked).count();
        int paidLeaveDays = (int) records.stream().filter(WorkDayRecord::isPaidLeave).count();
        int unpaidLeaveDays = (int) records.stream().filter(WorkDayRecord::isUnpaidLeave).count();
        int absentDays = (int) records.stream()
                .filter(record -> !record.isWorked() && !record.isPaidLeave())
                .count();
        int payableDays = workedDays + paidLeaveDays;

        BigDecimal totalHours = records.stream()
                .filter(WorkDayRecord::isWorked)
                .map(record -> safe(record.getHoursWorked()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal overtimeHours = records.stream()
                .map(record -> safe(record.getOvertimeHours()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalBonus = records.stream()
                .map(record -> safe(record.getBonusAmount()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal defaultHours = safe(settings.getDefaultWorkingHours());
        if (defaultHours.compareTo(BigDecimal.ZERO) <= 0) {
            defaultHours = BigDecimal.ONE;
        }
        BigDecimal hourlyRate = safe(settings.getDefaultDailyPay()).divide(defaultHours, 4, RoundingMode.HALF_UP);
        BigDecimal overtimeRate = safe(settings.getOvertimeHourlyRate()).compareTo(BigDecimal.ZERO) > 0
                ? safe(settings.getOvertimeHourlyRate())
                : hourlyRate;

        BigDecimal baseEarnings;
        String mode = settings.getCalculationMode() == null ? "daily" : settings.getCalculationMode();
        String label;
        if ("fixed".equals(mode)) {
            baseEarnings = safe(settings.getMonthlyBaseSalary());
            label = "Fixed monthly salary";
        } else if ("hourly".equals(mode)) {
            baseEarnings = totalHours.multiply(hourlyRate);
            label = "Hourly wage";
        } else if ("mixed".equals(mode)) {
            baseEarnings = safe(settings.getMonthlyBaseSalary())
                    .add(safe(settings.getDefaultDailyPay()).multiply(BigDecimal.valueOf(payableDays)));
            label = "Mixed salary + daily wage";
        } else {
            baseEarnings = safe(settings.getDefaultDailyPay()).multiply(BigDecimal.valueOf(payableDays));
            label = "Daily wage";
        }

        BigDecimal overtimeEarnings = overtimeHours.multiply(overtimeRate);
        BigDecimal finalSalary = baseEarnings.add(overtimeEarnings).add(totalBonus);
        BigDecimal average = payableDays == 0
                ? BigDecimal.ZERO
                : finalSalary.divide(BigDecimal.valueOf(payableDays), 2, RoundingMode.HALF_UP);

        return new SalarySummary(
                monthKey,
                daysInMonth,
                records.size(),
                workedDays,
                paidLeaveDays,
                unpaidLeaveDays,
                absentDays,
                Math.max(0, daysInMonth - records.size()),
                totalHours,
                overtimeHours,
                hourlyRate,
                overtimeRate,
                baseEarnings,
                overtimeEarnings,
                totalBonus,
                finalSalary,
                average,
                label,
                List.of(
                        new SalarySummaryLine(label, baseEarnings),
                        new SalarySummaryLine("Overtime", overtimeEarnings),
                        new SalarySummaryLine("Bonuses", totalBonus)));
    }

    private BigDecimal safe(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }
}
