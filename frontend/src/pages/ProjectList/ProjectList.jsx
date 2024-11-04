import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";
import { useLocation, useNavigate } from "react-router-dom";

export const tags = [
    "all","react","spring boot","mysql","html","css","js","nodejs","expressjs","python","ai","ml","nextjs","tailwind","mongodb","firebase","java",
];

const ProjectList = () => {

    const [keyword,setKeyword] = useState("");
    const {project,auth} = useSelector(store=>store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    useEffect(()=>{
        dispatch(fetchProjects({category,tag}));
    },[category,tag,auth.jwt]);
    
    const handleFilterChange = (section,value) => {
        if(value==="all"){
            searchParams.delete(section);
        }else{
            searchParams.set(section,value);
        }

        const query = searchParams.toString();
        navigate({search:query ? `?${query}`:""});
    };

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
        if(e.target.value){
            dispatch(searchProjects(e.target.value));
        }
    };


    return(
        <>
            <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">

                <section className="filterSection max-w-xs">

                    <Card className="p-5 sticky top-10 bg_grad"> 

                        <div className="flex justify-between">
                            <p className="text-2xl -tracking-wider font-medium">Filters</p>
                            <Button variant="ghost" size="icon">
                                <MixerHorizontalIcon/>
                            </Button>

                        </div>

                        <CardContent className="mt-3">

                        <ScrollArea className="space-y-5 h-[57vh]">

                            <div>
                                <h1 className="pb-3 text-gray-400 border-b text-lg font-medium">
                                    Category
                                </h1>
                                <div className="pt-5">
                                    <RadioGroup defaultValue={category || "all"} onValueChange={(value) => handleFilterChange("category",value)}>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value='all' id='r1'/>
                                            <Label className="font-normal" htmlFor="r1">All</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value='fullstack' id='r2'/>
                                            <Label className="font-normal" htmlFor="r2">Full Stack</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value='frontend' id='r3'/>
                                            <Label className="font-normal" htmlFor="r3">Frontend</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value='backend' id='r4'/>
                                            <Label className="font-normal" htmlFor="r4">Backend</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="pt-10 pb-5">
                                <h1 className="pb-3 text-gray-400 border-b text-lg font-medium">
                                    Tags
                                </h1>
                                <div className="pt-5">
                                    <RadioGroup defaultValue={tag || "all"} onValueChange={(value) => handleFilterChange("tag",value)}>
                                        {tags.map((item) => <div key={item} className="flex items-center gap-2">
                                            <RadioGroupItem value={item} id={`r-${item}`}/>
                                            <Label className="font-normal" htmlFor={`r-${item}`}>{item}</Label>
                                        </div>)}
                                    </RadioGroup>
                                </div>
                            </div>

                        </ScrollArea>

                        </CardContent>

                    </Card>

                </section>

                <section className="projectListSection w-full lg:w-[48rem]">
                    <div className="flex gap-2 items-center pb-5 justify-between">
                        <div className="relative p-0 w-full">

                            <Input placeholder="Search Projects" onChange={handleSearchChange} className="40% px-9" />
                            <MagnifyingGlassIcon className="absolute top-3 left-4"/>

                        </div>
                    </div>
                    <div>
                        <ScrollArea className="space-y-4 min-h-[74vh]">

                            {
                                keyword?
                                    project.searchProjects.map((item) => <ProjectCard key={item.id} item={item} />)
                                    :
                                    project.projects.map((item) => <ProjectCard key={item.id} item={item} />)
                            }   

                            {project.projects.length>0 ? (
                                <div></div>
                            ) : (
                                <div className="flex flex-row items-start justify-center">
                                    <h1 className="text-gray-400">No Projects</h1>
                                </div>
                            )}

                        </ScrollArea>
                        
                    </div>
                </section>

            </div>
        </>
    )

}

export default ProjectList;