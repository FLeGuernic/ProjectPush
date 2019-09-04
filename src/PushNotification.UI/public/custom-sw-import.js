// JavaScript source code
self.addEventListener('push', event => {
    const options = {
        body: 'This notification was generated from a push!',
      
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore', title: 'Go to the site',
                
            },
            {
                action: 'close', title: 'Close the notification',
                
            },
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options),
        console.log("evenement push")
    );
});
