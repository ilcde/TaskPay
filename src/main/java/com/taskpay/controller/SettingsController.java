package com.taskpay.controller;

import com.taskpay.domain.AppSettings;
import com.taskpay.domain.SalarySettings;
import com.taskpay.repository.AppSettingsRepository;
import com.taskpay.repository.SalarySettingsRepository;
import jakarta.validation.Valid;
import java.time.Instant;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    private final AppSettingsRepository appSettingsRepository;
    private final SalarySettingsRepository salarySettingsRepository;

    public SettingsController(
            AppSettingsRepository appSettingsRepository,
            SalarySettingsRepository salarySettingsRepository) {
        this.appSettingsRepository = appSettingsRepository;
        this.salarySettingsRepository = salarySettingsRepository;
    }

    @GetMapping("/app")
    public AppSettings appSettings() {
        return appSettingsRepository.findById(AppSettings.DEFAULT_ID)
                .orElseGet(AppSettings::defaults);
    }

    @PutMapping("/app")
    public AppSettings saveAppSettings(@RequestBody AppSettings settings) {
        settings.setId(AppSettings.DEFAULT_ID);
        settings.setUpdatedAt(Instant.now());
        return appSettingsRepository.save(settings);
    }

    @GetMapping("/salary")
    public SalarySettings salarySettings() {
        return salarySettingsRepository.findById(SalarySettings.DEFAULT_ID)
                .orElseThrow(() -> new IllegalStateException("Salary settings not found"));
    }

    @PutMapping("/salary")
    public SalarySettings saveSalarySettings(@Valid @RequestBody SalarySettings settings) {
        settings.setId(SalarySettings.DEFAULT_ID);
        settings.setUpdatedAt(Instant.now());
        return salarySettingsRepository.save(settings);
    }
}
