"use client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 justify-between items-center flex flex-row">
        <Link href="/">
          <Image src="/Logo.svg" alt="FSW Barber" height={18} width={120} />
        </Link>

        {/* UI MENU COMPONENT */}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size="icon">
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
