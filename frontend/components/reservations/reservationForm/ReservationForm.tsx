"use client";
import styles from "@/frontend/components/reservations/reservationForm/reservationForm.module.css";
import { useState } from "react";
import { postReservation } from "@/services/reservation-services/reservationServices";


type Props = {
  mealId: number
};
export const ReservationForm = ({ mealId }: Props) => {
  const [form, setForm] = useState({
    ContactName: "",
    ContactPhoneNumber: "",
    EmailId: "",
    NumberOfGuests: 1,
  });


  const handleSubmit = async (formData: FormData) => {
    try {
      const formInput = {
        contactName: formData.get("contactName") as string,
        contactPhoneNumber: formData.get("contactPhoneNumber") as string,
        EmailId: formData.get("EmailId") as string,
        numberOfGuests: Number(formData.get("numberOfGuests")),
        createdDate: new Date().toISOString(),
        mealId, 
      };

      await postReservation(formInput);
      alert("Reservation created");
    } catch (error) {
      console.error("POST error:", error);
      alert("Error adding reservation");
    }
  };

  return (
    <form action={handleSubmit}className={styles.reservationForm}>
      <label htmlFor="contactName">Name</label>
      <input
        type="text"
        name="contactName"
        placeholder="Name"
        value={form.ContactName}
        onChange={(e) => setForm({ ...form, ContactName: e.target.value })}
        required
      />

      <label htmlFor="contactPhoneNumber">Phone</label>
      <input
        type="tel"
        name="contactPhoneNumber"
        placeholder="Phone"
        value={form.ContactPhoneNumber}
        onChange={(e) =>
          setForm({ ...form, ContactPhoneNumber: e.target.value })
        }
        required
      />

      <label htmlFor="EmailId">Email</label>
      <input
        type="email"
        name="EmailId"
        placeholder="Email"
        value={form.EmailId}
        onChange={(e) =>
          setForm({ ...form,EmailId: e.target.value })
        }
        required
      />

      <label htmlFor="numberOfGuests">Guests</label>
      <input
        type="number"
        name="numberOfGuests"
        placeholder="Guests"
        value={form.NumberOfGuests}
        onChange={(e) =>
          setForm({ ...form, NumberOfGuests: Number(e.target.value) })
        }
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};
