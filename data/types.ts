export type HotelType = {
    name: string;
    price: string;
    city: string;
    available_on: string;
}
export type Props = { hotels: HotelType[], className?: string }

export type DateErrorType = { isValid: boolean, error: string }