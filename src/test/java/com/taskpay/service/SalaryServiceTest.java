package com.taskpay.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.taskpay.domain.SalarySettings;
import com.taskpay.domain.WorkDayRecord;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;

class SalaryServiceTest {
    private final SalaryService salaryService = new SalaryService(null, null);

    @Test
    void dailyModeCalculatesDaysHoursOvertimeAndBonus() {
        SalarySettings settings = settings("daily");
        WorkDayRecord first = workDay("2026-06-01", true, "8", "0", "50000");
        WorkDayRecord second = workDay("2026-06-02", true, "9", "1", "0");
        WorkDayRecord absent = workDay("2026-06-03", false, "0", "0", "0");
        absent.setUnpaidLeave(true);

        SalarySummary summary = salaryService.summarize(settings, List.of(first, second, absent), "2026-06");

        assertThat(summary.workedDays()).isEqualTo(2);
        assertThat(summary.totalHours()).isEqualByComparingTo("17");
        assertThat(summary.overtimeHours()).isEqualByComparingTo("1");
        assertThat(summary.baseEarnings()).isEqualByComparingTo("200000");
        assertThat(summary.overtimeEarnings()).isEqualByComparingTo("12500");
        assertThat(summary.totalBonus()).isEqualByComparingTo("50000");
        assertThat(summary.finalSalary()).isEqualByComparingTo("262500");
    }

    @Test
    void fixedModeUsesMonthlyBaseAndAddsBonus() {
        SalarySettings settings = settings("fixed");
        WorkDayRecord record = workDay("2026-06-01", true, "8", "0", "200000");

        SalarySummary summary = salaryService.summarize(settings, List.of(record), "2026-06");

        assertThat(summary.baseEarnings()).isEqualByComparingTo("10000000");
        assertThat(summary.finalSalary()).isEqualByComparingTo("10200000");
    }

    private SalarySettings settings(String mode) {
        SalarySettings settings = new SalarySettings();
        settings.setCurrency("VND");
        settings.setMonthlyBaseSalary(new BigDecimal("10000000"));
        settings.setDefaultDailyPay(new BigDecimal("100000"));
        settings.setDefaultWorkingHours(new BigDecimal("8"));
        settings.setOvertimeHourlyRate(BigDecimal.ZERO);
        settings.setCalculationMode(mode);
        settings.setMonthStartDay(1);
        return settings;
    }

    private WorkDayRecord workDay(String date, boolean worked, String hours, String overtime, String bonus) {
        WorkDayRecord record = new WorkDayRecord();
        record.setDate(LocalDate.parse(date));
        record.setMonthKey(MonthKeys.fromDate(record.getDate()));
        record.setWorked(worked);
        record.setHoursWorked(new BigDecimal(hours));
        record.setOvertimeHours(new BigDecimal(overtime));
        record.setBonusAmount(new BigDecimal(bonus));
        return record;
    }
}
