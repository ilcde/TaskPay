package com.taskpay.config;

import com.taskpay.domain.AppSettings;
import com.taskpay.domain.Category;
import com.taskpay.domain.SalarySettings;
import com.taskpay.repository.AppSettingsRepository;
import com.taskpay.repository.CategoryRepository;
import com.taskpay.repository.SalarySettingsRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedDefaults(
            AppSettingsRepository appSettingsRepository,
            SalarySettingsRepository salarySettingsRepository,
            CategoryRepository categoryRepository) {
        return args -> {
            if (!appSettingsRepository.existsById(AppSettings.DEFAULT_ID)) {
                appSettingsRepository.save(AppSettings.defaults());
            }

            if (!salarySettingsRepository.existsById(SalarySettings.DEFAULT_ID)) {
                SalarySettings settings = new SalarySettings();
                settings.setId(SalarySettings.DEFAULT_ID);
                settings.setCurrency("VND");
                settings.setMonthlyBaseSalary(new BigDecimal("10000000"));
                settings.setDefaultDailyPay(new BigDecimal("100000"));
                settings.setDefaultWorkingHours(new BigDecimal("8"));
                settings.setOvertimeHourlyRate(BigDecimal.ZERO);
                settings.setCalculationMode("daily");
                settings.setMonthStartDay(1);
                settings.setNote("");
                settings.setUpdatedAt(Instant.now());
                salarySettingsRepository.save(settings);
            }

            if (categoryRepository.count() == 0) {
                Instant now = Instant.now();
                categoryRepository.saveAll(List.of(
                        Category.create("Công việc", "#2563eb", now),
                        Category.create("Cá nhân", "#0f766e", now),
                        Category.create("Hóa đơn", "#d97706", now),
                        Category.create("Sức khỏe", "#16a34a", now)));
            }
        };
    }
}
