import { useDispatch, useSelector } from "react-redux";
import SubscriptionCard from "./SubscriptionCard";
import { useEffect } from "react";
import { getUserSubscription } from "@/Redux/Subscription/Action";

const monthlyPlan = [
    "Add Unlimited Projects",
    "Access to Live Chat",
    "Add Unlimited Team Members",
    "Advanced Reporting",
    "Priority Support",
    "Customization Options",
    "Integration Support",
    "Advanced Security",
    "Training and Resources",
    "Access Control",
    "Custom Workflows",
];

const annualPlan = [
    "Add Unlimited Projects",
    "Access to Live Chat",
    "Add Unlimited Team Members",
    "Advanced Reporting",
    "Priority Support",
    "Includes everything that monthly plan consists",
];

const freePlan = [
    "Add upto 3 Projects",
    "Basic Task Management",
    "Project Collaboration",
    "Basic Reporting",
    "Email Notifications",
    "Basic Access Control",
];



const Subscription = () => {

    const {auth,subscription} = useSelector(store=>store);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserSubscription());
    },[]);

    return(
        <div className="p-10">

            <h1 className="text-4xl font-semibold py-5 pb-16 text-center">Pricing</h1>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
                <SubscriptionCard data={{
                    planName:"Free",
                    features:freePlan,
                    planType:"FREE",
                    price:0,
                    buttonName: subscription.userSubscription?.planType=="FREE"?"Current Plan":"Get Started"
                }}/>
                <SubscriptionCard data={{
                    planName:"Monthly Paid Plan",
                    features:monthlyPlan,
                    planType:"MONTHLY",
                    price:599,
                    buttonName: subscription.userSubscription?.planType=="MONTHLY"?"Current Plan":"Get Started"
                }}/>
                <SubscriptionCard data={{
                    planName:"Annual Paid Plan",
                    features:annualPlan,
                    planType:"ANNUALLY",
                    price:4999,
                    buttonName: subscription.userSubscription?.planType=="ANNUALLY"?"Current Plan":"Get Started"
                }}/>
            </div>

        </div>
    )
}

export default Subscription;