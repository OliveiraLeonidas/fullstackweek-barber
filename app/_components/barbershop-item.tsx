"use client"
{/* No caso do Next todas as pages são server component, desta forma quando temos interatividade precisamos declarar use client na primeira linha */}
import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from 'next/image'
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
    barbershop: Barbershop;
}

const BarbershopItem = ({barbershop} : BarbershopItemProps) => {
    {/* Redireciona para a barbearia que o cliente deseja reservar */}
    const router = useRouter();
    const handleBookingClick = () => {
        router.push(`/barbershops/${barbershop.id}`)
    }
    return ( 
        <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
            {/* the cardcontent already a padding by default */}
            <CardContent className="px-1 py-0">
                <div className="px-1 w-full relative h-[159px]">
                    <div className="absolute top-3 left-3 z-50">
                        <Badge variant="secondary"  className="flex items-center gap-1 top-3 left-3 opacity-90">
                            <StarIcon size={12} className="fill-primary text-primary"/>
                            <span className="text-sx">5,0</span>
                        </Badge>
                    </div>
                    <Image 
                        src={barbershop.imageUrl} 
                        alt={barbershop.name} 
                        width={0} height={0} 
                        sizes="100vw" 
                        style={{
                            objectFit: "cover"
                        }}
                        fill
                        className=" pt-1 rounded-2xl" 
                        />
                </div>
                
                <div className="px-2 pb-3">
                    <h2 className="font-bold mt-3 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                    <Button className="w-full bg-secondary mt-2" onClick={handleBookingClick}>
                        Reservar
                    </Button>

                </div>
            </CardContent>
        </Card>
     );
}
 
export default BarbershopItem;