"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const cancelBooking = async (bookingId: string) => {
  // Delete the booking
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  // Revalidate the bookings and source page after canceling the booking
  revalidatePath("/");
  revalidatePath("/bookings/page");
};
