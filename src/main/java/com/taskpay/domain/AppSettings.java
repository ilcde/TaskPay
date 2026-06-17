package com.taskpay.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.Instant;

@Entity
public class AppSettings {
    public static final String DEFAULT_ID = "default";

    @Id
    private String id;

    private String language;
    private String themeMode;
    private String backgroundType;
    private String customBackgroundColor;
    private String reminderSound;
    private boolean notificationEnabled;
    private boolean vibrationEnabled;
    private boolean vibrationOnly;

    @Column(length = 500)
    private String dailyReminderTimes;

    private int storageCleanupMonths;
    private Instant updatedAt;

    public static AppSettings defaults() {
        AppSettings settings = new AppSettings();
        settings.setId(DEFAULT_ID);
        settings.setLanguage("vi");
        settings.setThemeMode("system");
        settings.setBackgroundType("softGradient");
        settings.setCustomBackgroundColor("#eaf7f2");
        settings.setReminderSound("gentle");
        settings.setNotificationEnabled(true);
        settings.setVibrationEnabled(true);
        settings.setVibrationOnly(false);
        settings.setDailyReminderTimes("08:00,13:00,19:00");
        settings.setStorageCleanupMonths(6);
        settings.setUpdatedAt(Instant.now());
        return settings;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getThemeMode() {
        return themeMode;
    }

    public void setThemeMode(String themeMode) {
        this.themeMode = themeMode;
    }

    public String getBackgroundType() {
        return backgroundType;
    }

    public void setBackgroundType(String backgroundType) {
        this.backgroundType = backgroundType;
    }

    public String getCustomBackgroundColor() {
        return customBackgroundColor;
    }

    public void setCustomBackgroundColor(String customBackgroundColor) {
        this.customBackgroundColor = customBackgroundColor;
    }

    public String getReminderSound() {
        return reminderSound;
    }

    public void setReminderSound(String reminderSound) {
        this.reminderSound = reminderSound;
    }

    public boolean isNotificationEnabled() {
        return notificationEnabled;
    }

    public void setNotificationEnabled(boolean notificationEnabled) {
        this.notificationEnabled = notificationEnabled;
    }

    public boolean isVibrationEnabled() {
        return vibrationEnabled;
    }

    public void setVibrationEnabled(boolean vibrationEnabled) {
        this.vibrationEnabled = vibrationEnabled;
    }

    public boolean isVibrationOnly() {
        return vibrationOnly;
    }

    public void setVibrationOnly(boolean vibrationOnly) {
        this.vibrationOnly = vibrationOnly;
    }

    public String getDailyReminderTimes() {
        return dailyReminderTimes;
    }

    public void setDailyReminderTimes(String dailyReminderTimes) {
        this.dailyReminderTimes = dailyReminderTimes;
    }

    public int getStorageCleanupMonths() {
        return storageCleanupMonths;
    }

    public void setStorageCleanupMonths(int storageCleanupMonths) {
        this.storageCleanupMonths = storageCleanupMonths;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
