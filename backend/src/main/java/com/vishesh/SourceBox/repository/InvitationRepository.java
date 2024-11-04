package com.vishesh.SourceBox.repository;

import com.vishesh.SourceBox.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation,Long> {

    Invitation findByToken(String token);

    void deleteByToken(String token);
    Invitation findByEmail(String userEmail);

}
