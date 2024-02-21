import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "../_components/barbershop-item";
import { db } from "../_lib/prisma";
import { auth } from "@/auth";

export default async function Home() {
  //a home page é um server component, logo é possível acessar o banco
  const session = await auth();
  const user = await db.user.findFirst();
  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany(),

      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
      }),
      session?.user
        ? await db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

  return (
    <div className="">
      <Header />

      {/* sessao bem vindo */}
      <div className="px-5 py-5 flex flex-col">
        <h2 className="font-bold text-xl mb-2">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}!`
            : "Olá, vamos agendar um corte hoje"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      {/* Fim da sessao bem vindo */}

      {/* Sessao de busca */}
      <div className="px-5 py-2">
        <Search />
      </div>
      {/*Fim Sessao de busca */}

      {/* Card de agendamentos */}

      <div className="px-5 mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 uppercase font-bold text-sm text-gray-400">
              Agendamentos
            </h2>
            <div className="flex flex-row gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden ">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="px-5 mt-6">
        <h2 className="py-2 uppercase font-bold text-sm text-slate-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div className="min-w-[167px] " key={barbershop.id}>
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 px-5 mb-[4.5rem]">
        <h2 className="text-sm mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {/*TODO: implementar ordenação por avaliação de barbearias */}
          {recommendedBarbershops.map((barbershop) => (
            <div className="min-w-[167px]" key={barbershop.id}>
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
