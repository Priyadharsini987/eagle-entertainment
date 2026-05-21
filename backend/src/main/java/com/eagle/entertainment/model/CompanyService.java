package com.eagle.entertainment.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CompanyService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String price;
    private String accent;
    private String features; // Comma separated list of features

    public CompanyService() {}

    public CompanyService(String name, String price, String accent, String features) {
        this.name = name;
        this.price = price;
        this.accent = accent;
        this.features = features;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getAccent() { return accent; }
    public void setAccent(String accent) { this.accent = accent; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
}
