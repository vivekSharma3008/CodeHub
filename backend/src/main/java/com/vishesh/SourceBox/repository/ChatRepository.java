package com.vishesh.SourceBox.repository;

import com.vishesh.SourceBox.model.Chat;
import com.vishesh.SourceBox.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat,Long> {

    Chat findByProject(Project projectById);

}
