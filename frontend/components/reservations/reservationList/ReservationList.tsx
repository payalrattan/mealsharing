"use client";
import { useEffect, useState } from "react";
import { getReservation } from "@/services/reservation-services/reservationServices";
import { ReservationVM } from "@/models/reservation/ReservationVM";
import Link from "next/link";

//list all reservations
export const ReservationList = () => {
  const [data, setData] = useState<ReservationVM[]>([]);

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = async () => {
    const result = await getReservation();
    setData(result);
  };

  console.log(data);

  return (
    <div>
      {data &&
        data.map((reservation, id) => (
          <div key={id}>
            <p>Reservation Id: {reservation.Id}</p>
            <h4>Contact Name: {reservation.ContactName}</h4>
            <Link href={`/reservations/${reservation.Id}`}>View details</Link>
          </div>
        ))}
    </div>
  );
};
