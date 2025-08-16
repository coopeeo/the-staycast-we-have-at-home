(function() {
    const context = cast.framework.CastReceiverContext.getInstance();
    const castDebugLogger = cast.debug.CastDebugLogger.getInstance();

    let loadingscreenthing = false;

    window.addEventListener('load', () => {
        if (loadingscreenthing)
            document.querySelector('.loading-popup').classList.remove('show');
        else
            loadingscreenthing = true
    });
    document.addEventListener('DOMContentLoaded', () => {
        context.start();
    });

    context.addEventListener(cast.framework.system.EventType.READY, () => {
        if (!castDebugLogger.debugOverlayElement_) {
            // Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
            castDebugLogger.setEnabled(false);
            castDebugLogger.showDebugLogs(false);
        }
    });



    const CUSTOM_CHANNEL = 'urn:x-cast:xyz.coopeeo.cast.app';
    context.addCustomMessageListener(CUSTOM_CHANNEL, function(customEvent) {
        castDebugLogger.debug('Custom message received: ' + JSON.stringify(customEvent.data));
        if (customEvent.data.type === 'settings') {
            setSettings(customEvent.data);
            if (loadingscreenthing)
                document.querySelector('.loading-popup').classList.remove('show');
            else
                loadingscreenthing = true;
        }
    });




    // coopers functions

    function setSettings(settings) {
        const { guestWifi, castName, person, website, code } = settings;
        document.querySelector('.network-name').textContent = guestWifi;
        document.querySelector('.device-name').textContent = castName;
        document.querySelector('.person').textContent = person;
        document.querySelector('.website-name').textContent = website;
        document.querySelector('.step-code').textContent = code.toString().replace(/\d{3}/g, "$& ").trim();
    }
})();