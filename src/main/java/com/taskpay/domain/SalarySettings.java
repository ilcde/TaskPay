package com.taskpay.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
public class SalarySettings {
    public static final String DEFAULT_ID = "default";

    @Id
    private String id;

    @NotBlank
    private String currency;

    @Column(precision = 19, scale = 2)
    private BigDecimal monthlyBaseSalary;

    @Column(precision = 19, scale = 2)
    private BigDecimal defaultDailyPay;

    @Column(precision = 10, scale = 2)
    private BigDecimal defaultWorkingHours;

    @Column(precision = 19, scale = 2)
    private BigDecimal overtimeHourlyRate;

    private String calculationMode;

    @Min(1)
    @Max(28)
    private int monthStartDay;

    @Column(length = 1500)
    private String note;

    private Instant updatedAt;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getMonthlyBaseSalary() {
        return monthlyBaseSalary;
    }

    public void setMonthlyBaseSalary(BigDecimal monthlyBaseSalary) {
        this.monthlyBaseSalary = monthlyBaseSalary;
    }

    public BigDecimal getDefaultDailyPay() {
        return defaultDailyPay;
    }

    public void setDefaultDailyPay(BigDecimal defaultDailyPay) {
        this.defaultDailyPay = defaultDailyPay;
    }

    public BigDecimal getDefaultWorkingHours() {
        return defaultWorkingHours;
    }

    public void setDefaultWorkingHours(BigDecimal defaultWorkingHours) {
        this.defaultWorkingHours = defaultWorkingHours;
    }

    public BigDecimal getOvertimeHourlyRate() {
        return overtimeHourlyRate;
    }

    public void setOvertimeHourlyRate(BigDecimal overtimeHourlyRate) {
        this.overtimeHourlyRate = overtimeHourlyRate;
    }

    public String getCalculationMode() {
        return calculationMode;
    }

    public void setCalculationMode(String calculationMode) {
        this.calculationMode = calculationMode;
    }

    public int getMonthStartDay() {
        return monthStartDay;
    }

    public void setMonthStartDay(int monthStartDay) {
        this.monthStartDay = monthStartDay;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
