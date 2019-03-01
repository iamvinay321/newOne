
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class GetMessageService {

  getMessage: Subject<any>;
  constructor(private wsService: WebSocketService) {
    this.getMessage= <Subject<any>>wsService
    .connect().pipe(
    map((response: any): any =>{
      return response;
    }))
   }

   sendMessage(resp){
     this.getMessage.next(resp);
   }

}
