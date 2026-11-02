export interface Country {
    country: string;
    cities?: string[];
}

export interface State {
    name: string;
    state_code?: string;
}

export interface CountriesResponse {
    error: boolean;
    msg: string;
    data: Country[];
}

export interface StatesResponse {
    error: boolean;
    msg: string;
    data: {
        name: string;
        states: State[];
    };
}

export interface CitiesResponse {
    error: boolean;
    msg: string;
    data: string[];
}

export interface GeoState {
    countries: Country[];
    states: State[];
    cities: string[];
    loading: {
        countries: boolean;
        states: boolean;
        cities: boolean;
    };
    errors: {
        countries: string;
        states: string;
        cities: string;
    };
}
