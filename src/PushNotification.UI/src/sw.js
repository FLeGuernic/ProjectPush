/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// TODO 2.6 - Handle the notificationclose event
self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});


// TODO 2.7 - Handle the notificationclick event



// TODO 3.1 - add push event listener

self.addEventListener('push', event => {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Default body';
    }

    const options = {
        body: body,
        icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore', title: 'Go to the site',
                icon: 'images/checkmark.png'
            },
            {
                action: 'close', title: 'Close the notification',
                icon: 'images/xmark.png'
            },
        ]
    };

   event.waitUntil(
  clients.matchAll().then(c => {
    //console.log(c);
    //if (c.length === 0) {
      // Show notification
      self.registration.showNotification('Push Notification', options);
    //} else {
      // Send a message to the page to update the UI
      //console.log('Application is already open!');
    //}
  })
);
});



self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
        const options = {}
        const subscription = await self.registration.pushManager.subscribe(options)
        console.log(JSON.stringify(subscription))
    } catch (err) {
        console.log('Error', err)
    }
})
