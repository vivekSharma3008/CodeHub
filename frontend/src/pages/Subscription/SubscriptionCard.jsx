import { createPayment } from "@/Redux/Payment/Action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

const SubscriptionCard = ({data}) => {

    const dispatch = useDispatch();
    const handleUpgrade = () => {
        dispatch(createPayment({planType:data.planType,jwt:localStorage.getItem("jwt")}));
    };

    return (
        <div className="rounded-xl bg_grad bg-opacity-20 shadow-[#14173b] shadow-xl card p-5 space-y-6 w-[20rem] flex items-center flex-col hov_size">

            <p className="text-md font-semibold">{data.planName}</p>
            <p className="text-gray-400 font-bold text-2xl">
                <span>₹{data.price}</span>
                <span className="font-medium text-xs"> / {data.planType}</span>
                <span>{data.planType=="ANNUALLY" && <Badge className="ml-2 h-5 w-15 bg-green-500 font-bold text-[10px] text-green-950">30% off</Badge>}</span>
            </p>

            {
                data.buttonName=="Current Plan" && <Button className="w-[12rem] bg-blue-900 hover:bg-blue-900 rounded-xl" variant="secondary">
                    {data.buttonName}
                </Button>
            }
            {
                data.buttonName!="Current Plan" && <Button onClick={handleUpgrade} className="w-[12rem] hover:bg-blue-900 rounded-xl" variant="secondary">
                    {data.buttonName}
                </Button>
            }

            <div>
                {data.features.map((item,index) => <div key={index} className="flex items-center gap-2 text-gray-500 text-sm">
                    <CheckCircledIcon/>
                    <p>{item}</p>
                </div>)}
            </div>

        </div>
    )
}

export default SubscriptionCard;