(function() {
    const context = cast.framework.CastReceiverContext.getInstance();
    const castDebugLogger = cast.debug.CastDebugLogger.getInstance();

    let loadingscreenthing = false;
    let infoSettings = {};

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
        // @ts-ignore
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
            if (!document.querySelector('.loading-popup').classList.contains('show')) {
                document.querySelector('.loading-popup').classList.add('show');
                setTimeout(_ => {
                    setSettings(customEvent.data);
                }, 500);
            } else
                setSettings(customEvent.data);
        } else if (customEvent.data.type === 'connection-success') {
            document.querySelector('.connection-success-popup').classList.add('show');
            setTimeout(() => {
                document.querySelector('.connection-success-popup').classList.remove('show');
            }, 3000);
        } else if (customEvent.data.type === 'not-active') {
            setSettings(customEvent.data)
        }
    });


    // coopers functions

    function setSettings(settings) {
        if (!settings || settings.type == 'not-active' || 
            ((!settings.guestWifi || settings.guestWifi.length == 0) ||
             (!settings.castName || settings.castName.length == 0) ||
             (!settings.person || settings.person.length == 0) ||
             (!settings.website || settings.website.length == 0) ||
             (!settings.code || settings.code == 0))) {
            infoSettings = {};
            if (document.querySelector('.not-active-popup').classList.contains('show')) {
                if (loadingscreenthing)
                    document.querySelector('.loading-popup').classList.remove('show');
                else
                    loadingscreenthing = true;
            } else
                document.querySelector('.not-active-popup').classList.add('show');
                setTimeout(() => {
                    if (loadingscreenthing)
                        document.querySelector('.loading-popup').classList.remove('show');
                    else
                        loadingscreenthing = true;
                }, 500);
            return;
        }
        const { guestWifi, castName, person, website, code } = settings;
        infoSettings = settings;
        document.querySelector('.network-name').textContent = guestWifi;
        document.querySelector('.device-name').textContent = castName;
        document.querySelector('.person').textContent = person;
        document.querySelector('.website-name').textContent = website;
        document.querySelector('.step-code').textContent = code.toString().replace(/\d{3}/g, "$& ").trim();
        if (!document.querySelector('.not-active-popup').classList.contains('show')) {
            if (loadingscreenthing)
                document.querySelector('.loading-popup').classList.remove('show');
            else
                loadingscreenthing = true;
        } else
            document.querySelector('.not-active-popup').classList.remove('show');
            setTimeout(() => {
                if (loadingscreenthing)
                    document.querySelector('.loading-popup').classList.remove('show');
                else
                    loadingscreenthing = true;
            }, 500);
    }
})();