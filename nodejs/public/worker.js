self.addEventListener("install", function(e) {
    self.skipWaiting();
    console.log("installing service worker...")
});

self.addEventListener("activate", function(e) {
    console.log("service worker activated")
});

self.addEventListener("push", function(e) {
    console.log("recieved a push notification !");
    console.log('hourra');
    const data = e.data.json();
    return self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
    });
});

self.addEventListener("notificationclick", function(e) {
    console.log("click on the notification");
    e.notification.close();
    e.waitUntil(clients.openWindow('https://www.mozilla.org/fr/'))
});
