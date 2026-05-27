package com.eagle.entertainment.controller;

import com.eagle.entertainment.model.Event;
import com.eagle.entertainment.model.Gallery;
import com.eagle.entertainment.model.Inquiry;
import com.eagle.entertainment.model.Testimonial;
import com.eagle.entertainment.model.TeamMember;
import com.eagle.entertainment.model.CompanyService;
import com.eagle.entertainment.model.CompanyStat;
import com.eagle.entertainment.repository.EventRepository;
import com.eagle.entertainment.repository.GalleryRepository;
import com.eagle.entertainment.repository.InquiryRepository;
import com.eagle.entertainment.repository.TestimonialRepository;
import com.eagle.entertainment.repository.TeamMemberRepository;
import com.eagle.entertainment.repository.CompanyServiceRepository;
import com.eagle.entertainment.repository.CompanyStatRepository;
import com.eagle.entertainment.repository.SiteSettingRepository;
import com.eagle.entertainment.model.SiteSetting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired private EventRepository eventRepository;
    @Autowired private GalleryRepository galleryRepository;
    @Autowired private TestimonialRepository testimonialRepository;
    @Autowired private InquiryRepository inquiryRepository;
    @Autowired private TeamMemberRepository teamMemberRepository;
    @Autowired private CompanyServiceRepository companyServiceRepository;
    @Autowired private CompanyStatRepository companyStatRepository;
    @Autowired private SiteSettingRepository siteSettingRepository;

    // ---- Team Members ----
    @GetMapping("/team")
    public List<TeamMember> getTeamMembers() {
        return teamMemberRepository.findAllByOrderByIdAsc();
    }

    // ---- Events ----
    @GetMapping("/services")
    public List<CompanyService> getServices() {
        return companyServiceRepository.findAll();
    }

    @GetMapping("/stats")
    public List<CompanyStat> getStats() {
        return companyStatRepository.findAll();
    }

    @GetMapping("/settings")
    public List<SiteSetting> getSettings() {
        return siteSettingRepository.findAll();
    }

    @GetMapping("/events/upcoming")
    public List<Event> getUpcomingEvents() {
        return eventRepository.findByIsUpcomingTrueOrderByEventDateAsc();
    }

    @GetMapping("/events/recent")
    public List<Event> getRecentEvents() {
        return eventRepository.findByIsUpcomingFalseOrderByEventDateDesc();
    }

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ---- Gallery ----
    @GetMapping("/gallery")
    public List<Gallery> getGallery() {
        return galleryRepository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/gallery/category/{category}")
    public List<Gallery> getGalleryByCategory(@PathVariable String category) {
        return galleryRepository.findByCategoryOrderByEventDateDesc(category);
    }

    // ---- Testimonials ----
    @GetMapping("/testimonials")
    public List<Testimonial> getTestimonials() {
        return testimonialRepository.findAllByOrderByCreatedAtDesc();
    }

    // ---- Contact / Inquiry ----
    @PostMapping("/inquiry")
    public ResponseEntity<?> submitInquiry(@RequestBody Inquiry inquiry) {
        Inquiry saved = inquiryRepository.save(inquiry);
        return ResponseEntity.ok(Map.of(
            "message", "Thank you! We'll get back to you within 24 hours.",
            "id", saved.getId()
        ));
    }

    // ---- Stats ----
    @GetMapping("/stats/overview")
    public ResponseEntity<?> getStatsOverview() {
        long totalEvents = eventRepository.count();
        long upcomingEvents = eventRepository.findByIsUpcomingTrueOrderByEventDateAsc().size();
        return ResponseEntity.ok(Map.of(
            "totalEvents", totalEvents,
            "upcomingEvents", upcomingEvents,
            "happyClients", 500,
            "yearsExperience", 10
        ));
    }
}
