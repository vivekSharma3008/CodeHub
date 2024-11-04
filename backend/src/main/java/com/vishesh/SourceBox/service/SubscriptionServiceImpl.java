package com.vishesh.SourceBox.service;

import com.vishesh.SourceBox.domain.PlanType;
import com.vishesh.SourceBox.domain.SubscriptionType;
import com.vishesh.SourceBox.model.Subscription;
import com.vishesh.SourceBox.model.User;
import com.vishesh.SourceBox.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private UserService userService;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Override
    public Subscription createSubscription(User user) {

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setSubscriptionStartDate(LocalDate.now());
        subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        subscription.setValid(true);
        subscription.setPlanType(PlanType.FREE);
        subscription.setSubscriptionType(SubscriptionType.FREE);

        return subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription getUsersSubscription(Long userId) throws Exception {

        Subscription subscription = subscriptionRepository.findByUserId(userId);
        if(subscription==null){
            throw new Exception("Subscription not found with User Id: "+userId);
        }
        subscription.setValid(isValid(subscription));
        if(!isValid(subscription)){
            subscription.setPlanType(PlanType.FREE);
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
            subscription.setSubscriptionStartDate(LocalDate.now());
        }
        return subscriptionRepository.save(subscription);

    }

    @Override
    public Subscription upgradeSubscription(Long userId, PlanType planType) {

        Subscription subscription = subscriptionRepository.findByUserId(userId);
        subscription.setSubscriptionType(SubscriptionType.PAID);
        subscription.setPlanType(planType);
        subscription.setSubscriptionStartDate(LocalDate.now());
        subscription.setValid(true);
        if(planType.equals(PlanType.ANNUALLY)){
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        }
        else{
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(1));
        }

        return subscriptionRepository.save(subscription);

    }

    @Override
    public boolean isValid(Subscription subscription) {

        if(subscription.getSubscriptionType().equals(SubscriptionType.FREE)){
            return true;
        }
        LocalDate endDate = subscription.getSubscriptionEndDate();
        LocalDate currDate = LocalDate.now();

        return endDate.isAfter(currDate) || endDate.isEqual(currDate);

    }
}
