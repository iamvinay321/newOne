import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class WebSocketService {
  public socket;
  constructor() { }
  public listenOn='message';
  public sendOnKey='message';

  reconnectSocket(){
    this.socket.on('disconnect',()=>{
      let inst=this;
      var timer=setInterval(function(){
        console.log("Attempting reconnection");
        if(inst.socket.connected==false){
          inst.socket.connect();
          inst.socket.removeAllListeners('disconnect');
          clearInterval(timer);
          console.log("Reconneced !");
        }
      },500);
    });
    this.socket.disconnect();
  }

  connect(): Rx.Subject<MessageEvent>{
    //this.socket=io("http://localhost:2012");
    
    this.socket=io("https://node-server-interface.herokuapp.com/")
    let observable= new Observable(observer =>{
      this.socket.on(this.listenOn, (data) => {
        console.log("Received a message from web-socket server..");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer= {
      next: (data: Object) => {
        this.socket.emit(this.sendOnKey, data);
      },
    };

    return Rx.Subject.create(observer, observable);
  }

}
