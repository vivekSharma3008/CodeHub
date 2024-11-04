package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.domain.PlanType;
import com.vishesh.SourceBox.model.Subscription;
import com.vishesh.SourceBox.model.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUsersSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);

}
