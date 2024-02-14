import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => (
    <Card>
        <CardContent className="px-5 py-6 flex flex-row justify-between items-center">
            <Image src="Logo.svg" alt="FSW Barber" className="" width={120} height={22} />
            <Button 
                variant={"outline"} 
                size={"icon"}
                className="h-10 w-10"
            >
                <MenuIcon size={20}/>
            </Button>
        </CardContent>
    </Card>
)
 
export default Header;