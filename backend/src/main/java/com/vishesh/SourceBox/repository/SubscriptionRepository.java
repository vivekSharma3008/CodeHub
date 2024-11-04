package com.vishesh.SourceBox.repository;

import com.vishesh.SourceBox.model.Subscription;
import com.vishesh.SourceBox.service.SubscriptionService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {

    Subscription findByUserId(Long userId);

}
