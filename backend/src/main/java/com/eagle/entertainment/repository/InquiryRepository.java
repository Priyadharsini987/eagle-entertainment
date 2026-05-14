package com.eagle.entertainment.repository;

import com.eagle.entertainment.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findAllByOrderByCreatedAtDesc();
    List<Inquiry> findByStatusOrderByCreatedAtDesc(String status);
    long countByStatus(String status);
}
