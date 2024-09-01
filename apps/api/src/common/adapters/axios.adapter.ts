import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { HttpAdapter } from './../interfaces/http-adapter.interface';

/**
 * Axios Adapter for HttpAdapter
 * @method get - Get method for Axios Adapter
 * @export AxiosAdapter - Export Axios Adapter for HttpAdapter interface 
 * @class AxiosAdapter - Axios Adapter class for HttpAdapter interface
 * @implements HttpAdapter - Implements HttpAdapter interface
 * @example - Example of usage:
 * ```
 * import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
    
    @Injectable()
    export class SeedService {
        constructor(
            private readonly http: AxiosAdapter,
        ) {}

        async executeSeed() {
            const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
        }
    }
 * ```
 */
@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>( url );
            return data;
        } catch (error) {
            
            throw new Error('This is an error - Check logs');
        }
    }
}
