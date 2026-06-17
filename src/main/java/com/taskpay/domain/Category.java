package com.taskpay.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "categories", indexes = @Index(name = "idx_categories_name", columnList = "name"))
public class Category {
    @Id
    private String id;

    @NotBlank
    private String name;

    private String color;
    private Instant createdAt;

    public static Category create(String name, String color, Instant now) {
        Category category = new Category();
        category.setId("cat_" + UUID.randomUUID());
        category.setName(name);
        category.setColor(color);
        category.setCreatedAt(now);
        return category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
