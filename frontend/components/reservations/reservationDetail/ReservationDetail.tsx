"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ReservationVM } from "@/models/reservation/ReservationVM";
import { getReservationById } from "@/services/reservation-services/reservationServices";

export const ReservationDetail = () => {
  const [reservation, setReservation] = useState<ReservationVM | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const params = useParams();
  const slug = params.slug as string;
  const reservationId = Number(slug);

  useEffect(() => {
    if (!reservationId) return;
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getReservationById(reservationId!);
      setReservation(response);
    } catch (e) {
      setIsError(true);
      setError(String(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <h2>Loading...</h2>}
      {isError && (
        <div>
          <p>Something went wrong:</p>
          <p>{error || "N/A"}</p>
        </div>
      )}
      {reservation && (
        <div>
          <p>Name: {reservation.ContactName}</p>
          <p>Total Guests: {reservation.NumberOfGuests}</p>
          <p>Meal ID: {reservation.MealId}</p>
          <p>Phone: {reservation.ContactPhoneNumber}</p>
          <p>Created: {reservation.CreatedDate}</p>
        </div>
      )}
    </div>
  );
};
