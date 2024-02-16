"use client"
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LogOutIcon, UserIcon, LogInIcon, HomeIcon, CalendarIcon } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "./ui/button";

const SideMenu = () => {
    const {data, status} = useSession();
    const handleSignOut = () => {signOut()}
    const handleSigIn = () => {signIn("google")}
    /* With signIn("google") it shows the login google screen without that it only have a google sigIn button */
    return (
        <>
              <SheetHeader>
                    <SheetTitle className="text-left border-b border-solid border-secondary p-4">Menu</SheetTitle>
                </SheetHeader>

                {/* Ui user component / login status */}
                {data?.user ? (
                    <div className="flex justify-between px-5 py-6">
                        <div className="flex items-center  gap-3">
                            <Avatar>
                                <AvatarImage 
                                    src={data?.user?.image ?? " "}
                                    alt={data?.user?.name ?? " "}/>
                            </Avatar>


                            {/* USER NAME */}
                            
                            <h2 className="font-bold">{data?.user?.name}</h2>
                        </div>
                        <Button variant={"secondary"} size={'icon'}>
                            <LogOutIcon onClick={handleSignOut}/>
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 px-5 py-6">
                        {/* unauthenticated */}
                        <div className="flex items-center gap-2 mb-2">
                            <UserIcon size={32} />
                            <h2 className="font-bold">Olá, Faça seu login</h2>
                        </div>
                        <Button variant={"secondary"} className="w-full justify-start gap-3" onClick={handleSigIn}>
                            <LogInIcon />
                            <h2>Fazer login!</h2>
                            </Button>
                    </div>
                )}


                <div className="flex flex-col gap-3 px-5">
                    <Button variant={"outline"} className="justify-start items-center gap-3" asChild>
                        <Link href="/">
                            <HomeIcon size={18} className="mr-2"/>
                            Início
                        </Link>
                    </Button>
                </div>

                {data?.user && (
                    <div className="flex flex-col gap-3 px-5 mt-3">
                    <Button variant={"outline"} className="justify-start items-center gap-3" asChild>
                        <Link href="/bookings">
                            <CalendarIcon size={18} className="mr-2"/>
                            Agendamentos
                        </Link>
                    </Button>
                </div>
                )}
        </>
    )
}
 
export default SideMenu;