"use client";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cancelBooking } from "../_action/cancel-booking";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date);

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);
    try {
      await cancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger className="min-w-full">
        <Card className="min-w-full">
          <CardContent className="flex py-0 px-0">
            <div className="flex flex-col flex-[3] gap-2 py-3 pl-4">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className="w-fit"
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold w-fit mb-2">{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={booking.barbershop.imageUrl}></AvatarImage>

                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-5">
        <SheetHeader className="text-left pb-5 border-b border-solid border-secondary">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="px-0">
          <div className="relative px-5 h-[180px] w-full mt-4">
            <Image
              src={"/barbershopMap.svg"}
              alt={booking.barbershop.name}
              fill
              style={{
                objectFit: "contain",
              }}
            />
            <div className="absolute w-full bottom-8 left-0 px-4">
              <Card>
                <CardContent className="p-3 flex gap-2 items-center">
                  <Avatar className="">
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="font-bold">{booking.barbershop.name}</h1>
                    <h2 className="text-sm overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </h2>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="w-fit mb-6"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="">
            <Card>
              <CardContent className="p-3 gap-2 flex flex-col">
                <div className="flex justify-between">
                  <h2 className="font-bold text">{booking.service.name}</h2>
                  <h3 className="font-bold text">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service.price))}
                  </h3>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Data</h3>
                  <h4 className="text-gray-400 text-sm">
                    {format(booking.date, "dd 'de' MMM ", {
                      locale: ptBR,
                    })}
                  </h4>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Horário</h3>
                  <h4 className="text-gray-400 text-sm">
                    {format(booking.date, "hh:mm")}
                  </h4>
                </div>

                <div className="flex justify-between">
                  <h3 className="text-gray-400 text-sm">Barbearia</h3>
                  <h4 className="text-gray-400 text-sm">
                    {booking.barbershop.name}
                  </h4>
                </div>
              </CardContent>
            </Card>
          </div>

          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button variant={"secondary"} className="w-full">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isBookingConfirmed || isDeleteLoading}
                  variant={"destructive"}
                  className="w-full"
                >
                  {isDeleteLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Cancelar reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar sua reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter esta ação!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row items-center justify-center gap-3">
                  <AlertDialogCancel className="w-full mt-0">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCancelClick}
                    disabled={isDeleteLoading}
                    className="w-full mt-0"
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
