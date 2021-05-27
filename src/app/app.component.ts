import { Component,  OnInit } from '@angular/core';
import { JokesService } from './jokes.service';

import { Joke } from './joke.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   
  jokes: Joke[] = [];
  categories: string[] = []; 

  constructor(
     private jokesService: JokesService,
  ) {  }

  ngOnInit(){

      this.jokesService.getCategories()
          .subscribe( (categories: string[]) => {
            
              this.categories = categories;

              this.jokesService.getRandomJoke()
                  .subscribe( (joke: Joke) => {
                    // console.log('joke:', joke);
                      this.jokes.push(joke)
                  });
          });
  }

  searchByCategory(category: string){
    this.jokesService.getCategoryJoke(category)
         .subscribe((joke: Joke)=> {
           this.jokes = [];
           this.jokes.push(joke);
         }); 
  }

  searchBySearchTerm(searchTerm: string){
    if(searchTerm !== ''){
      this.jokesService.getSearchJokes(searchTerm)
           .subscribe( jokes => {
              this.jokes = jokes.result;
           });
    }
  }



}
