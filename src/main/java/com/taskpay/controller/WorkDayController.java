package com.taskpay.controller;

import com.taskpay.domain.WorkDayRecord;
import com.taskpay.service.MonthKeys;
import com.taskpay.service.WorkDayService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/work-days")
public class WorkDayController {
    private final WorkDayService workDayService;

    public WorkDayController(WorkDayService workDayService) {
        this.workDayService = workDayService;
    }

    @GetMapping
    public List<WorkDayRecord> list(@RequestParam(required = false) String monthKey) {
        String resolvedMonth = monthKey == null || monthKey.isBlank()
                ? MonthKeys.fromDate(LocalDate.now())
                : monthKey;
        return workDayService.listByMonth(resolvedMonth);
    }

    @PutMapping("/{date}")
    public WorkDayRecord save(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestBody WorkDayRecord record) {
        return workDayService.save(date, record);
    }

    @DeleteMapping("/{date}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        workDayService.deleteByDate(date);
    }
}
