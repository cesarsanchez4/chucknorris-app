import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Joke } from './joke.model';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private URL = environment.api_url;

  constructor( private http: HttpClient ) { }


   getRandomJoke(){
      return this.http.get<Joke>( this.URL + 'random');
   }


   getCategories(){
     return this.http.get<string[]>(  this.URL + 'categories' );
   }

   getCategoryJoke(category: string){
     return this.http.get<Joke>(  this.URL + `random?category=${category}`);
   }

   getSearchJokes(serarchTerm: string){
     return this.http.get<{ result: Joke[], amont: number }>( this.URL + `search?query=${serarchTerm}` )
   }

}
