package com.taskpay.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

public final class MonthKeys {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM");

    private MonthKeys() {
    }

    public static String fromDate(LocalDate date) {
        return YearMonth.from(date).format(FORMATTER);
    }

    public static YearMonth parse(String monthKey) {
        return YearMonth.parse(monthKey, FORMATTER);
    }
}
