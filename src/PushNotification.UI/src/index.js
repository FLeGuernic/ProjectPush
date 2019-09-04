// JavaScript source code
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


class Label extends React.Component {
    

    render() {
        return (
            <button className={this.props.name}
                onClick={() => this.props.onClick()} >
                {this.props.name}
            </button>
            
            )
    }
}

class Infos extends React.Component {

    render() {
    return(
        <div>
            <table>
             <tbody>
            <tr>
                <th>Poste  </th>
                <th>Endpoint  </th>
                
                    </tr>
                </tbody>
                <tbody>
        <tr>
            <td> {this.props.poste} </td>
                <td> {this.props.endpoint} </td>
                    </tr>
                </tbody>
            </table>

            </div>
    )

       }        
        }
        
        
        
class Postes extends React.Component {

   
    constructor(props) {
        super(props);
        this.state = {
            status: "You are now registered as an attendant",
            checked: Array(2).fill(0),
            textbtn: "Allow Notifications",
            attendant: true,
            swReg: null,
            isSubscribed: false,
            SubStatus: "You are not subscribed",
            Function: 'Attendant',
            endpoint: "No endpoint",
            isSubscribed: false,
        }
    }

    allowNotif() {

        if (!('Notification' in window)) {
            console.log('This browser does not support notifications!');
            return;
        }

        Notification.requestPermission(status => {
            console.log('Notification permission status:', status);
            console.log(Notification['permission']);

        });
    }


    
    renderTablePush() {
         
        return <Infos poste={this.state.poste} endpoint={this.state.endpoint}/>
    }
    renderNotifBtn() {
        return <Label name={this.state.textbtn}
    onClick = {() => this.allowNotif() } />
    }
    renderLabel(name) {
        return <Label name={name} onClick={() => this.handleClickAtt()} />
    }

    handleClickSubBtn() {
        if (this.state.SubStatus === 'You are not subscribed') {
            this.subscribe();
            this.setState(
                {
                    SubStatus: 'You are subscribed',

                }
            )
        }

        else {
            this.unsubscribe();
            this.setState(
                {
                    SubStatus: 'You are not subscribed'
                }
            )
        } 
    }

    renderSubButton() {
        return <Label name={this.state.SubStatus}
            onClick={() => this.handleClickSubBtn()}
        />
    }

    renderPushBtn() {
        return <Label name="Push"
            onClick={
                () => this.SendPush() 
            } />
    }
    renderSaveInApiBtn() {
        return <Label name="Enregistrer les données"
            onClick={
                () => this.PostInfo()
            } />
    }
    handleClickAtt() {
        if (this.state.attendant) {
            this.setState(
                {
                    status: "You are now registered as a driver",
                    attendant: false,
                    poste: "Driver",
                }
            )
        }

        else {

            this.setState(
                {
                    status: " You are now registered as an attendant",
                    attendant: true,
                    poste: "Attendant",
                }

            )
        }
    }

    urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
        
    async unsubscribe() {
        const sw = await navigator.serviceWorker.ready;
        navigator.serviceWorker.getRegistration().then(swregistration => {
            swregistration.pushManager.getSubscription().then(subscription => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            })
           
        }).then(
            console.log("User is unsubscribed"),
            fetch('https://localhost:44344/api/sub/1', {
                method: 'DELETE'}),
            console.log("User deleted"),
            this.setState(
                {
                    isSubscribed: false,
                    SubStatus: "You are not subscribed",
                    endpoint: "",
            }
        )
                
        )
            .catch(err => {
                console.log('Error unsubscribing', err);
            })
    }
    async   subscribe() {
        var that = this;
        navigator.serviceWorker.getRegistration().then(function (swregistration) {
            const applicationServerPublicKey = 'BHDtP0H0kbcu_rouKyzaQPKTc7fG7nHFUyQ1H6o5aRiS9khxHKZfKUO1xUAPHrgVJir7rtPjAcWkA2AfJq3MRj8';
            console.log("avant la conversion : " + applicationServerPublicKey)
            const applicationServerKey = that.urlB64ToUint8Array(applicationServerPublicKey);
            console.log("après la conversion : " + applicationServerKey);
            console.log("il y a un truc")
            swregistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey,
            }
            ).then(
                subscription => {
                    console.log("User is subscribed with the subscription : ");
                    console.log(subscription);
                    console.log(subscription.toJSON());

                    that.setState(
                        {
                            isSubscribed: true,
                            SubStatus: " You are subscribed",
                            endpoint: JSON.stringify(subscription),

                        });
                    that.PostInfo();

                }
            )
                  .catch(err => {
                    if (Notification.permission === 'denied') {
                        console.warn('Permission for notifications was denied');
                    } else {
                        console.error('Failed to subscribe the user: ', err);
                    }

                });
        })
        
      
       
      
    }
    
    SendPush() {
        const webpush = require('web-push');

        const vapidPublicKey = 'BHDtP0H0kbcu_rouKyzaQPKTc7fG7nHFUyQ1H6o5aRiS9khxHKZfKUO1xUAPHrgVJir7rtPjAcWkA2AfJq3MRj8';
        const vapidPrivateKey = '8mdICKO2b05oK__SMd7SW6Wow9qMXsQemXL9EUpQgTE';

        fetch('https://localhost:44344/api/sub')
            .then(response => {
                response.json().then(data => {
                    console.log("On va essayer d'envoyer une notif à : " + data[0].subscriptionEndPoint)
                    console.log(this.state.endpoint)
                    console.log('Hello, ' + data[0].name + 'You are a  train' + this.state.Function)
                    console.log("y a t il un sw  ?")
                    navigator.serviceWorker.getRegistration().then(function (registration) {
                        console.log(registration)
                    })
                    console.log("y a t il une push Sub ?")
                    navigator.serviceWorker.getRegistration().then(function (registration) {
                        registration.pushManager.getSubscription().then(
                            function (sub) {
                                console.log(sub)
                            })
                    })
                    const payload = 'Hello, ' + data[0].name + 'You are a  train ' + this.state.Function;

                    const options = {
                        //gcmAPIKey: 'YOUR_SERVER_KEY',
                        TTL: 60,
 
                        // TODO 4.3b - add VAPID details
                        vapidDetails: {
                            subject: 'mailto: francois.leguernic@belgiantrain.be',
                            publicKey: vapidPublicKey,
                            privateKey: vapidPrivateKey
                        }


                    };



                    console.log("Juste avant d'envoyer la notif on veut envoyer à  :")
                    console.log(this.state.endpoint)
                    
;
                
                    webpush.sendNotification(
                        this.state.endpoint,
                        payload,
                        options
                    ).catch(err => {
                        console.log('Error pushing', err);
                    });
                })
            })
            
    }

    
            
            

    PostInfo()  {
        

        fetch('https://localhost:44344/api/sub', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'POST',
            body: JSON.stringify({
                'Id': '1',
                'Name': 'Geofrey',
                'Function': JSON.stringify( this.state.Function ),
                'SubscriptionEndPoint': this.state.endpoint 
            })
        })

            .then(response => {
                
                console.log("La réponse est : ");
                console.log(response)
                if (!response.ok) {
                    console.log("Problem with response")
                    return response.statusText
                    
                }

            }
            )
            .catch(err => {
                console.log(err);
            }
            )
    }
    ;

    render() {

         

        return (
            <div>
                <h1> Push Notifications </h1>
                <div className="infos">

                    <div className="buttonsG">
                        <h2>{this.renderLabel("Change function")}</h2>
                        <h2>{this.renderNotifBtn()}</h2>
                        
                    </div>

                    <br />
                    <br />

                <div className="buttonsD">
                <h2>{this.renderSubButton()}</h2>
                <h2>{this.renderPushBtn()}</h2>
                </div>
                   
                </div>
                <div className="tableau" > {this.renderTablePush()}</div>
                

                

            </div>
        );
    }
}

class App extends React.Component {





    
    render() {

        
       
        return (<div>
            <Postes />
            
            
        </div>)
    }
}



ReactDOM.render(
    
    <App />

   ,
document.getElementById('root')                            
                            
)




serviceWorker.register();
