import { Component,OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Conditional } from '@angular/compiler';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title: string = 'Github Parametre';
  jsonData: any;
  userData:any=[];
  constructor(private dataService:DataService){};
  ngOnInit(){
    // fetch username 
    const cachedData:any=sessionStorage.getItem('userData');
    if(JSON.parse(cachedData)){
      console.log('önbellekten veri alındı');
      console.log(JSON.parse(cachedData))
      this.userData=JSON.parse(cachedData);
    }
    else{
      this.dataService.getUserName().subscribe((data) => {
        this.jsonData = data;
        // callback
        this.createUserDetail(this.jsonData);
      });
    }
  }
  //
  async createUserDetail(data:any){
    for (let item of data) {
      try {
        const response = await this.dataService.getUserDetail(item.username).toPromise();
        console.log(response);
        this.userData.push(response);
        sessionStorage.setItem('userData',JSON.stringify(this.userData))
      } catch (error) {
        console.error(error);
      }
    }
    console.log(this.userData);
  }

}

