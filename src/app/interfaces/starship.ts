export interface Starship {
trackById: string;
    name:string;
    model:string;
    starship_class:string;
    manufacturer:string;
    cost_in_credits: string;
    length: string
    crew:string;
    passengers:string;
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
    id ? : string;
    imageUrl?: string;

}

export interface StarshipApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Starship[];
  }
  