import {Component, OnInit} from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Message} from '../services/backend/messages/message.model';


@Component({
    selector: 'app-direct-message',
    templateUrl: './direct-message.page.html',
    styleUrls: ['./direct-message.page.scss'],
})
export class DirectMessagePage implements OnInit {
    public users = ['Daniel', 'Yadu', 'E for Pres.', 'Jon', 'Darren', 'Vasu'];
    public newMsg: string;
    ws: WebSocketSubject<any>;
    messages: Message[] = [

    ];

    currentUser = 'buenosdiasputa123123';

    sendMessage(ev) {
        this.messages.push({
            user: this.currentUser,
            createdAt: Date.now(),
            msg: this.newMsg,
        });
        this.messages.sort((a, b) => {
            return a.createdAt < b.createdAt ? -1 : 1;
        });
        this.ws.next(this.newMsg.trim());
        console.log(this.messages);
    }


    constructor() {
    }

    ngOnInit() {
        this.ws = webSocket('ws://127.0.0.1:44142');
        this.ws.asObservable().subscribe((msg: Message[]) => {
                console.log(msg);
                this.messages = this.messages.concat(msg);
                this.messages.sort((a, b) => {
                    return a.createdAt < b.createdAt ? -1 : 1;
                });
            },
            error => {
                console.log('ASD:' + error);
            });
    }

}
