package com.eagle.entertainment.controller;

import com.eagle.entertainment.model.*;
import com.eagle.entertainment.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired private EventRepository eventRepository;
    @Autowired private GalleryRepository galleryRepository;
    @Autowired private TestimonialRepository testimonialRepository;
    @Autowired private InquiryRepository inquiryRepository;
    @Autowired private TeamMemberRepository teamMemberRepository;

    // ---- Dashboard Stats ----
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats() {
        long totalEvents = eventRepository.count();
        long upcomingEvents = eventRepository.findByIsUpcomingTrueOrderByEventDateAsc().size();
        long newInquiries = inquiryRepository.countByStatus("NEW");
        long totalInquiries = inquiryRepository.count();
        long galleryCount = galleryRepository.count();
        long testimonialCount = testimonialRepository.count();

        return ResponseEntity.ok(Map.of(
            "totalEvents", totalEvents,
            "upcomingEvents", upcomingEvents,
            "newInquiries", newInquiries,
            "totalInquiries", totalInquiries,
            "galleryCount", galleryCount,
            "testimonialCount", testimonialCount
        ));
    }

    // ---- Events CRUD ----
    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventRepository.save(event));
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventRepository.findById(id).map(existing -> {
            event.setId(id);
            return ResponseEntity.ok(eventRepository.save(event));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
    }

    // ---- Gallery CRUD ----
    @GetMapping("/gallery")
    public List<Gallery> getAllGallery() {
        return galleryRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping("/gallery")
    public ResponseEntity<Gallery> createGallery(@RequestBody Gallery gallery) {
        return ResponseEntity.ok(galleryRepository.save(gallery));
    }

    @DeleteMapping("/gallery/{id}")
    public ResponseEntity<?> deleteGallery(@PathVariable Long id) {
        galleryRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Gallery item deleted"));
    }

    // ---- Testimonials CRUD ----
    @GetMapping("/testimonials")
    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping("/testimonials")
    public ResponseEntity<Testimonial> createTestimonial(@RequestBody Testimonial testimonial) {
        return ResponseEntity.ok(testimonialRepository.save(testimonial));
    }

    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<?> deleteTestimonial(@PathVariable Long id) {
        testimonialRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Testimonial deleted"));
    }

    // ---- Inquiries ----
    @GetMapping("/inquiries")
    public List<Inquiry> getAllInquiries() {
        return inquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    @PutMapping("/inquiries/{id}/status")
    public ResponseEntity<Inquiry> updateInquiryStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return inquiryRepository.findById(id).map(inquiry -> {
            inquiry.setStatus(body.get("status"));
            return ResponseEntity.ok(inquiryRepository.save(inquiry));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/inquiries/{id}")
    public ResponseEntity<?> deleteInquiry(@PathVariable Long id) {
        inquiryRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Inquiry deleted"));
    }

    // ---- Team Members CRUD ----
    @GetMapping("/team")
    public List<TeamMember> getAllTeamMembers() {
        return teamMemberRepository.findAllByOrderByIdAsc();
    }

    @PostMapping("/team")
    public ResponseEntity<TeamMember> createTeamMember(@RequestBody TeamMember member) {
        return ResponseEntity.ok(teamMemberRepository.save(member));
    }

    @PutMapping("/team/{id}")
    public ResponseEntity<TeamMember> updateTeamMember(@PathVariable Long id, @RequestBody TeamMember member) {
        return teamMemberRepository.findById(id).map(existing -> {
            member.setId(id);
            return ResponseEntity.ok(teamMemberRepository.save(member));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/team/{id}")
    public ResponseEntity<?> deleteTeamMember(@PathVariable Long id) {
        teamMemberRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Team member deleted successfully"));
    }
}
