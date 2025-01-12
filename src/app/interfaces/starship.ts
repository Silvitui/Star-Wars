export interface Starship {
    name:string;
    model:string;
    starship_class:string;
    manufacturer:string;
    cost_in_credits: string;
    length: string
    crew:string;
    passengetrs:string;
    max_atmosphering_speed:string;
    hyperdrive_rating:string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: string[];
    pilots: string[];
    url: string;
    created: string;
    edited: string;

}

export interface StarshipApiResponse {
    count: number;
    next: string;
    previous?: string;
    results: Starship[];
  }
  