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
    @Autowired private CompanyServiceRepository companyServiceRepository;
    @Autowired private CompanyStatRepository companyStatRepository;
    @Autowired private SiteSettingRepository siteSettingRepository;

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

    // ---- File Upload ----
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Please select a file to upload"));
            }
            java.io.File uploadDir = new java.io.File("./uploads");
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.io.File destinationFile = new java.io.File(uploadDir.getAbsolutePath() + java.io.File.separator + fileName);
            file.transferTo(destinationFile);
            
            String fileUrl = "/uploads/" + fileName;
            return ResponseEntity.ok(Map.of("imageUrl", fileUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to upload file: " + e.getMessage()));
        }
    }

    // ---- Services CRUD ----
    @GetMapping("/services")
    public List<CompanyService> getAllServices() {
        return companyServiceRepository.findAll();
    }

    @PostMapping("/services")
    public ResponseEntity<CompanyService> createService(@RequestBody CompanyService service) {
        return ResponseEntity.ok(companyServiceRepository.save(service));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<CompanyService> updateService(@PathVariable Long id, @RequestBody CompanyService service) {
        return companyServiceRepository.findById(id).map(existing -> {
            service.setId(id);
            return ResponseEntity.ok(companyServiceRepository.save(service));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        companyServiceRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Service deleted"));
    }

    // ---- Stats CRUD ----
    @GetMapping("/stats")
    public List<CompanyStat> getAllStats() {
        return companyStatRepository.findAll();
    }

    @PostMapping("/stats")
    public ResponseEntity<CompanyStat> createStat(@RequestBody CompanyStat stat) {
        return ResponseEntity.ok(companyStatRepository.save(stat));
    }

    @PutMapping("/stats/{id}")
    public ResponseEntity<CompanyStat> updateStat(@PathVariable Long id, @RequestBody CompanyStat stat) {
        return companyStatRepository.findById(id).map(existing -> {
            stat.setId(id);
            return ResponseEntity.ok(companyStatRepository.save(stat));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/stats/{id}")
    public ResponseEntity<?> deleteStat(@PathVariable Long id) {
        companyStatRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Stat deleted"));
    }

    // ---- Site Settings CRUD ----
    @GetMapping("/settings")
    public List<SiteSetting> getAllSettings() {
        return siteSettingRepository.findAll();
    }

    @PostMapping("/settings")
    public ResponseEntity<SiteSetting> updateSetting(@RequestBody SiteSetting setting) {
        return ResponseEntity.ok(siteSettingRepository.save(setting));
    }

    // ---- Clear Seed Data ----
    @PostMapping("/clear-seeds")
    public ResponseEntity<?> clearSeeds() {
        try {
            eventRepository.deleteAll();
            galleryRepository.deleteAll();
            testimonialRepository.deleteAll();
            teamMemberRepository.deleteAll();
            companyServiceRepository.deleteAll();
            companyStatRepository.deleteAll();
            return ResponseEntity.ok(Map.of("message", "All mock seed data cleared successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to clear mock data: " + e.getMessage()));
        }
    }
}
