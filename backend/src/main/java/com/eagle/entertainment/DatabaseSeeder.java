package com.eagle.entertainment;

import com.eagle.entertainment.model.CompanyService;
import com.eagle.entertainment.model.CompanyStat;
import com.eagle.entertainment.model.TeamMember;
import com.eagle.entertainment.repository.CompanyServiceRepository;
import com.eagle.entertainment.repository.CompanyStatRepository;
import com.eagle.entertainment.repository.TeamMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private CompanyServiceRepository serviceRepository;

    @Autowired
    private CompanyStatRepository statRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Override
    public void run(String... args) throws Exception {
        seedServices();
        seedStats();
        seedTeam();
    }

    private void seedServices() {
        if (serviceRepository.count() == 0) {
            serviceRepository.save(new CompanyService("Essential", "Starting from ₹50k", "var(--text-muted)", 
                "Venue Selection Assistance|Basic Decor & Lighting|Audio System Setup|On-site Coordination (4 hours)|Single Point of Contact"));
            serviceRepository.save(new CompanyService("Premium", "Starting from ₹2L", "var(--primary)", 
                "Full Venue Management|Professional Theme Decor|Live Band/DJ Management|Full-day Coordination|Digital Invitations & RSVPs"));
            serviceRepository.save(new CompanyService("Elite", "Starting from ₹5L", "var(--primary-light)", 
                "Global Logistics & Travel|Luxury Designer Decor|Celebrity Guest Management|Multi-day Event Planning|VIP Hospitality Services"));
        }
    }

    private void seedStats() {
        if (statRepository.count() == 0) {
            statRepository.save(new CompanyStat("500+", "Events Completed"));
            statRepository.save(new CompanyStat("10+", "Years of Experience"));
            statRepository.save(new CompanyStat("50+", "Team Members"));
            statRepository.save(new CompanyStat("98%", "Satisfied Clients"));
        }
    }

    private void seedTeam() {
        if (teamMemberRepository.count() == 0) {
            TeamMember t1 = new TeamMember();
            t1.setName("Priya Dharshini");
            t1.setRole("Founder & Managing Director");
            t1.setImageUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500");
            t1.setBio("With over a decade of experience, Priya drives the creative vision and execution of premium luxury events.");
            teamMemberRepository.save(t1);

            TeamMember t2 = new TeamMember();
            t2.setName("Arjun Prasad");
            t2.setRole("Co-Founder & Chief Operations Officer");
            t2.setImageUrl("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500");
            t2.setBio("Arjun manages logistics, vendor relations, and production operations, ensuring flawless execution on-site.");
            teamMemberRepository.save(t2);

            TeamMember t3 = new TeamMember();
            t3.setName("Deepa Raman");
            t3.setRole("Lead Wedding Designer");
            t3.setImageUrl("https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500");
            t3.setBio("Specializing in floral design and thematic aesthetics, Deepa designs bespoke dream wedding experiences.");
            teamMemberRepository.save(t3);
        }
    }
}
