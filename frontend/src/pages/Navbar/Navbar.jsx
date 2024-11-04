import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import CreateProjectForm from "../Project/CreateProjectForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";

const Navbar = () => {

    const {auth} = useSelector(store=>store);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (

        <div className="border-b py-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">

                <p onClick={() => navigate("/")} className="cursor-pointer text-lg text-gray-300">SourceBox</p>

                <Dialog>
                    <DialogTrigger>
                        <Button variant="ghost" className="font-normal">New Project</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Create New Project</DialogHeader>
                        <CreateProjectForm/>
                    </DialogContent>
                </Dialog>
                <Button variant="ghost" onClick={() => navigate("/upgrade_plan")} className="font-normal">Upgrade</Button>

            </div>
            <div className="flex gap-3 items-center">
                <p className="lg:block">{auth.user?.fullName}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <PersonIcon/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

    )

}

export default Navbar;