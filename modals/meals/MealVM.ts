export interface MealVM{
    MealId: number;
    Title: string;
    Description: string;
    Price: number;
    CreatedDate: string;
    MaxReservations: number;
    Location: string;
}
export type Props = {
  MealId: number
};