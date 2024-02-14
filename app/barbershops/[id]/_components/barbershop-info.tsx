"use client"

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from 'next/image'
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop,
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();
    const handleBackClike = () => {
        router.back();
    }
    return ( 
        <div>
            <Button
                size="icon"
                variant={"outline"}
                className="z-50 absolute top-4 left-4" 
                onClick={handleBackClike}
                >
                <ChevronLeftIcon/>
            </Button>


            <Button
                size="icon"
                variant={"outline"}
                className="z-50 absolute top-4 right-4" >
                <MenuIcon/>
            </Button>


            <div className="h-[250px] w-full relative">
                <Image 
                    src={barbershop?.imageUrl} 
                    fill 
                    alt={barbershop?.name} 
                    style={{
                        objectFit: "cover",
                    }}
                    className="opacity-75"
                />
            </div>

            <div className="px-5 py-3 pb-6 border-b border-s border-secondary">
                <h1 className="text-xl font-bold  ">
                    {barbershop?.name}
                </h1>
                <div className="flex items-center gap-1 mt-2">
                    <MapPinIcon className="stroke-primary" />
                    <p className="text-sm">{barbershop?.address} </p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <StarIcon className="stroke-primary" />
                    <p className="text-sm">5,0 (899 avaliações)</p>
                </div>
            </div>
        </div>
     );
}
 
export default BarbershopInfo;