import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  imagesList: string[]=[
    "https://www.ballerstatus.com/wp-content/uploads/2021/01/soccer-pexels-pixabay-47730.jpg",
    "https://cdn.britannica.com/q:60/44/193844-050-11485B18/ball-net-basketball-game-arena.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/Walton_Eller_at_2008_Summer_Olympics_double_trap_finals.JPG",
    "https://media.istockphoto.com/photos/cricket-leather-ball-resting-on-bat-on-the-stadium-pitch-picture-id1255328634?b=1&k=20&m=1255328634&s=170667a&w=0&h=kPODQbM_ZecfQOPipjG-iTfyvDwrlx6CQwECg2iGvQg=" ,
    "https://www.tutorialspoint.com/carrom/images/objective.jpg",
    "https://miro.medium.com/max/2500/1*9JdIsCt4tZKgVz7QTTRftw.jpeg",
    "https://www.lboro.ac.uk/media/media/sport/images/sports/swimming/gallery/swimmingpool-main-1%20copy.jpg",
    "https://i.pinimg.com/736x/6d/0e/cf/6d0ecfdee21932fcc2bd798e04a64270--wolf-warriors-boxing-club.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/San_Francisco_Mechanics%E2%80%99_Institute-0700.jpg/1200px-San_Francisco_Mechanics%E2%80%99_Institute-0700.jpg",
    "http://totalsportsandfitness.com/img/products/sports_goods/pool.jpg",
    "https://static.toiimg.com/thumb/msid-81268599,width-1200,height-900,resizemode-4/.jpg",
    "https://static.toiimg.com/photo/msid-70589390/70589390.jpg?1027318"
  
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
