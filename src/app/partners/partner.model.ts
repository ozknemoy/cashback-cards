
export class Category {
  id: number;
  name: string;
}

export class City {
  id: number;
  name: string;
  spx_id: number;
  country_id: number;
  region_id: number;
  lat: string;
  lon: string;
}

export class WTime {
  checked: number;
  from: string;
  to: string;
}

export class WorkingTime {
  ПН = new WTime();
  ВТ = new WTime();
  СР = new WTime();
  ЧТ = new WTime();
  ПТ = new WTime();
  СБ = new WTime();
  ВС = new WTime();
}

export class IPartner {
  id: number;
  name: string;
  category = new Category();
  city = new City();
  bonus_type: 0 | 1;
  _bonus_type: boolean;
  address: string;
  metro: string;
  about: string;
  working_time = new WorkingTime();
  lat: string;
  lon: string;
  phone: string;
  image: string;
  url: string;
  payment_type: number;//  0 начисление, 1 списание, 2 списание и начисление
}