"use client"
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import {MenuIcon} from "lucide-react";
import { signIn, useSession, signOut } from "next-auth/react";


const Header = () => {
    const {data} = useSession()

    const handlerLoginClick = async () => {
        await signIn("google");
    }
    return (  
        <Card>
            <CardContent className="p-5 justify-between items-center flex flex-row">
        
            <Image src="/Logo.svg" alt="" height={22} width={120} />
            

            {/*<Button variant={"outline"} size="icon">
                <MenuIcon/>
    </Button>*/}
            {data?.user ? <div> {<Button onClick={() => signOut()}>Logout</Button>}
             {data.user.name}</div> : 
            <Button onClick={handlerLoginClick}>Login</Button>}
            </CardContent>
        </Card>
    );
}
 
export default Header;


