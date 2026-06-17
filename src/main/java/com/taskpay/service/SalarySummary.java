package com.taskpay.service;

import java.math.BigDecimal;
import java.util.List;

public record SalarySummary(
        String monthKey,
        int daysInMonth,
        int trackedDays,
        int workedDays,
        int paidLeaveDays,
        int unpaidLeaveDays,
        int absentDays,
        int untrackedDays,
        BigDecimal totalHours,
        BigDecimal overtimeHours,
        BigDecimal hourlyRate,
        BigDecimal overtimeRate,
        BigDecimal baseEarnings,
        BigDecimal overtimeEarnings,
        BigDecimal totalBonus,
        BigDecimal finalSalary,
        BigDecimal averagePerWorkedDay,
        String calculationLabel,
        List<SalarySummaryLine> breakdown) {
}
