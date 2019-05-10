const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setAccType = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    admin.auth().setCustomUserClaims(uid,{
        host: data.isHost,
        patron: !data.isHost,
        premium: false,
    }).catch(error => {
        console.log(error);
    });
});

exports.addPatron = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    const patronData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        occupation: data.occupation
    };

    const ref = admin.database().ref(`users/patron/${uid}`);
    return ref.set(patronData).catch((error => {
        console.log('ERROR: ${error}')
    }))
});

exports.addHost = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    const hostData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        businessName: data.businessName,
        businessAddress: data.businessAddress,
        businessPhone: data.businessPhone,
        businessType: data.businessType
    };

    const ref = admin.database().ref(`users/host/${uid}`);
    return ref.set(hostData).catch((error => {
        console.log('ERROR: ${error}')
    }))
});

exports.addRoom = functions.https.onCall((data, context) => {
    console.log(data);
    const ref = admin.database().ref(`rooms/`);
    var newRoomID = ref.push(data).key
    console.log(`key: + ${newRoomID}`)

    admin.database().ref(`rooms/${newRoomID}`).update({
        roomID:newRoomID
    })
});

exports.createRoom = functions.https.onCall((data, context) => {
    console.log(data)

    return admin.database().ref('rooms/' + data).once('value').then((snapshot) => {
        data.roomInfo = snapshot.val()
    }).then(()=>{
        return{roomInfo:data.roomInfo}
    })
});


exports.updateRoom = functions.https.onCall((data, context) => {
    var roomID = data.roomID;
    console.log('roomID:' + roomID)
    console.log('data1: ' + data);
    admin.database().ref(`rooms/${roomID}`).update(data)
});

exports.hostBooking = functions.https.onCall((data, context) => {
    const userID = context.auth.uid;

    return admin.database().ref('currentBookings').orderByChild("room/hostID").
    equalTo(userID).once('value').then((snapshot) => {
        data.bookings = [];
        snapshot.forEach((doc) => {
            data.bookings.push(doc.val());
        });
        console.log(data.booking)
    }).then(() => {
        return { bookings: data.bookings };
    }).catch((error) => {
        console.log(error);
    });
});

exports.booking = functions.https.onCall((data, context) => {
    const userID = context.auth.uid;

    return admin.database().ref('currentBookings').orderByChild("room/hostID").
        equalTo(userID).once('value').then((snapshot) => {
            data.bookings = [];
            snapshot.forEach((doc) => {
                data.bookings.push(doc.val());
            });
            console.log(data.booking);
        }).then(() => {
            return { bookings: data.bookings };
          }).catch((error) => {
            console.log(error);
        });
});

<<<<<<< HEAD
// exports.hostUnbook = functions.https.onCall((data, context) => {

//     const userID = context.auth.uid;
//     admin.database().ref('currentBookings').child(data.bk.bookingID).remove();
//     return 1;
// });
=======
exports.hostUnbook = functions.https.onCall((data, context) => {
    const userID = context.auth.uid;
    admin.database().ref('currentBookings').child(data.bk.bookingID).remove();
    return 1;
});
>>>>>>> f14926d99da5dca8f41c0977e99994728bdd26ed

exports.patronBooking = functions.https.onCall((data, context) => {

    const userID = context.auth.uid;

    return admin.database().ref('currentBookings').orderByChild("user").
        equalTo(userID).once('value').then((snapshot) => {
            data.bookings = [];
            snapshot.forEach((doc) => {
                data.bookings.push(doc.val());
            })
        }).then(() => {
            return { bookings: data.bookings };
        }).catch((error) => {
            console.log(error);
        });
});


// exports.patronUnbook = functions.https.onCall((data, context) => {

//     const userID = context.auth.uid;
//     admin.database().ref('currentBookings').child(data.bk.bookingID).remove();
//     return 1;
// });


exports.hostDeleteRoom = functions.https.onCall((data, context) => {
    admin.database().ref('rooms').child(data.id).remove();
});

exports.createRoom =functions.https.onCall((data, context) => {
    return admin.database().ref('rooms/' + data.id).once('value').then((snapshot) => {
        data.roomInfo = snapshot.val();
    }).then(() => {
        return { roomInfo: data.roomInfo };
    }).catch((error) => {
        console.log(error);
    });
});


exports.bookingStatus = functions.https.onCall((data, context) =>  {

    admin.database().ref('allBookings').orderByChild("initialBookingID").
        equalTo(data.bookingID).once('value').then((snapshot) => {
            snapshot.forEach((doc) => {
                admin.database().ref('allBookings').child(doc.key).update({status: data.statMsg});
            })

            if(data.statMsg == "completed")
            {
                admin.database().ref('rooms/' + data.roomID).once('value').then((snapshot) => {
                    admin.database().ref('rooms/' + data.roomID).update({
                        bookingCounter: ++snapshot.val().bookingCounter
                    })
                });
            }
        });

    admin.database().ref('currentBookings').child(data.bookingID).remove();
});

exports.roomViewPatronCreated =functions.https.onCall((data, context) => {

    return admin.database().ref('users/patron/' + context.auth.uid).once('value').then((snapshot) => {
            data.userEmail = snapshot.val().email
            console.log('userEmail from cloud function: ' + data.userEmail)
    }).then(() => {
         return { userEmail: data.userEmail };
     }).catch((error) => {
         console.log(error);
    });
});

// {
//     "rules": {
//     "users": {
//         ".read": true,
//             ".write": true
//     },
//     "rooms": {
//         ".read": true,
//             ".write": true
//     },
//     "currentBookings": {
//         ".read": true,
//             ".write": true
//     },
//     "allBookings": {
//         ".read": true,
//             ".write": true
//     },
//       "roomtest": {
//         ".read": true,
//             ".write": true
//     }
// }
// }
