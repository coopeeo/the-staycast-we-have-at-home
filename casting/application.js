import { Application } from 'castv2-client';
import { MessageController } from './messagecontroller.js';

export class StayCastApplication extends Application {
    constructor(client, session) {
        super(client, session);
        this.messageController = this.createController(createMessageController);
    }
    sendMessage(type, data, callback) {
        this.messageController.sendMessage({type, ...data}, callback);
    }
}

StayCastApplication.APP_ID = '1C05BF09';

function createMessageController(client, session, destinationId) {
    return new MessageController(client, session, destinationId);
}

//util.inherits(StayCastApplication, Application);