import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'; //ios permssions needed
import { useEffect } from 'react';

// Notifications.setNotificationHandler({
//     // to show notification when app is running otherwise we get the notificarion when app is in background or we are not on the appp screen
//     handleNotification: async () => {
//         return {
//             shouldShowAlert: true,
//         };
//     },
// });
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function App() {
    useEffect(() => {
        ///for permissions only
        Permissions.getAsync()
            .then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    return Permissions.askAsync(Permissions.NOTIFICATIONS);
                }
                return statusObj;
            })
            .then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    throw new Error('Permission is denied!');
                }
            })
            .then(() => {
                console.log('39');
                // return Notifications.getExpoPushTokenAsync();
            })
            // .then((data) => {
            //     console.log(data);
            // })
            .catch((err) => {
                console.log('45', err);
                return null;
            });
    }, []);

    useEffect(() => {
        //reacting to foreground notification
        const foreGroundNotificationsubscription =
            Notifications.addNotificationReceivedListener((notification) => {
                console.log(notification);
            });
        //reacting to background notifications
        const backgroundNotificationSubscription =
            Notifications.addNotificationResponseReceivedListener(
                (notification) => {
                    console.log(notification);
                }
            );
        return () => {
            foreGroundNotificationsubscription.remove();
            backgroundNotificationSubscription.remove();
        };
    }, []);
    const onShowNotification = () => {
        // Notifications.scheduleNotificationAsync({
        //     content: {
        //         title: 'First Notifcation',
        //         body: 'My first notification is sent on this device',
        //     },
        //     trigger: {
        //         seconds: 10,
        //     },
        // });
    };
    return (
        <View style={styles.container}>
            <Button title="Show Notification" onPress={onShowNotification} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
