package com.taskpay.repository;

import com.taskpay.domain.SalarySettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalarySettingsRepository extends JpaRepository<SalarySettings, String> {
}
