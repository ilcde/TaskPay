package com.taskpay.controller;

import com.taskpay.service.MonthKeys;
import com.taskpay.service.SalaryService;
import com.taskpay.service.SalarySummary;
import java.time.LocalDate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final SalaryService salaryService;

    public ReportController(SalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @GetMapping("/monthly")
    public SalarySummary monthly(@RequestParam(required = false) String monthKey) {
        String resolvedMonth = monthKey == null || monthKey.isBlank()
                ? MonthKeys.fromDate(LocalDate.now())
                : monthKey;
        return salaryService.summarize(resolvedMonth);
    }
}
