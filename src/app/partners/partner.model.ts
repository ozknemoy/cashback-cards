
export interface Category {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  spx_id: number;
  country_id: number;
  region_id: number;
  lat: string;
  lon: string;
}

export interface WTime {
  checked: number;
  from: string;
  to: string;
}

export interface WorkingTime {
  ПН: WTime;
  ВТ: WTime;
  СР: WTime;
  ЧТ: WTime;
  ПТ: WTime;
  СБ: WTime;
  ВС: WTime;
}

export interface IPartner {
  id: number;
  name: string;
  category: Category;
  city: City;
  bonus_type: 0 | 1;
  address: string;
  metro: string;
  about: string;
  working_time: WorkingTime;
  lat: string;
  lon: string;
  phone: string;
  image: string;
  payment_type: 0 | 1;
}