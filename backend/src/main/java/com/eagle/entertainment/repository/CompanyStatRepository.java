package com.eagle.entertainment.repository;

import com.eagle.entertainment.model.CompanyStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyStatRepository extends JpaRepository<CompanyStat, Long> {
}
