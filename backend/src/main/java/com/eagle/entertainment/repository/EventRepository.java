package com.eagle.entertainment.repository;

import com.eagle.entertainment.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByIsUpcomingTrueOrderByEventDateAsc();
    List<Event> findByIsUpcomingFalseOrderByEventDateDesc();
    List<Event> findByStatusOrderByEventDateDesc(String status);
    List<Event> findByCategoryOrderByEventDateDesc(String category);
}
