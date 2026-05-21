package com.eagle.entertainment.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CompanyStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private String num;

    public CompanyStat() {}

    public CompanyStat(String num, String label) {
        this.num = num;
        this.label = label;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getNum() { return num; }
    public void setNum(String num) { this.num = num; }
}
