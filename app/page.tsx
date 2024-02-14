import Header from "./_components/header";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";
import Search from "./(home)/_components/search";
import BookingItem from "./_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "./_lib/prisma";

export default async function Home() {
  //a home page é um server component, logo é possível acessar o banco
  const barbershops = await db.barbershop.findMany();
  return (
    <div className="">
      <Header />

      {/* sessao bem vindo */}
      <div className="px-5 py-5 flex flex-col">
        <h2 className="font-bold text-xl mb-2">Olá, Leonidas</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      {/* Fim da sessao bem vindo */}

      {/* Sessao de busca */}
      <div className="px-5 py-3">
          <Search />
      </div>
      {/*Fim Sessao de busca */}

      {/* Card de agendamentos */}

      <div className="px-5 mt-6">
        <h2 className="mb-3 uppercase font-bold text-sm text-gray-400">Agendamentos</h2>
        <BookingItem></BookingItem>
      </div>

      <div className="px-5 mt-6">
        <h2 className="py-2 uppercase font-bold text-sm text-slate-400">Recomendados</h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 px-5 mb-[4.5rem]">
        <h2 className="text-sm mb-3 uppercase text-gray-400 font-bold">Populares</h2>
        
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

    </div>
  );
}
