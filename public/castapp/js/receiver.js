const context = cast.framework.CastReceiverContext.getInstance();

window.addEventListener('load', () => {
    document.querySelector('.loading-popup').classList.remove('show');
});
document.addEventListener('DOMContentLoaded', () => {
    context.start();
});
