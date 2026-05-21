package com.eagle.entertainment.repository;

import com.eagle.entertainment.model.CompanyService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyServiceRepository extends JpaRepository<CompanyService, Long> {
}
