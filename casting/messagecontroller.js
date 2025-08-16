import { RequestResponseController } from 'castv2-client';

export class MessageController extends RequestResponseController {
    constructor(client, sourceId, destinationId) {
        super(client, sourceId, destinationId, 'urn:x-cast:xyz.coopeeo.cast.app');

        this.currentSession = null;

        this.on('message', onmessage);
        this.once('close', onclose);

        var self = this;

        function onmessage(data, broadcast) {
            if (data.type === 'MESSAGE_STATUS' && broadcast) {
                var status = data.status[0];
                // Sometimes an empty status array can come through; if so don't emit it
                if (!status) return;
                self.currentSession = status;
                self.emit('status', status);
            }
        }

        function onclose() {
            self.removeListener('message', onmessage);
            self.stop();
        }

    }
    sendMessage(data, callback) {
        callback = callback || noop;

        this.request(data, function (err, response) {
            if (err) return callback(err);
            var status = response.status[0];
            callback(null, status);
        });
    }
}

function noop() {}