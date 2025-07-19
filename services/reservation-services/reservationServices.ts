import { axiosService } from "@/data/api/httpCommon";
import { ReservationVM } from "@/modals/reservation/ReservationVM";

//service to get all reservation
export const getReservation = async () => {
  const result = await axiosService.get("reservations");
  console.log(result.data.data);
  return result.data.data;
};
//service to get reservation by id
export const getReservationById = async (id: string) => {
  const path = `reservations/${id}`;

  const result = await axiosService.get(path);
  console.log(result.data.data);
  return result.data.data;
};

//to create new reservation
export const postReservation = async (body: ReservationVM) => {
  try {
    const result = await axiosService.post("reservations", body);
    console.log("Reservation created:", result.data.data);
    return result.data.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};
