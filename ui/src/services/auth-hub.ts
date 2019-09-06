import { Hub } from 'aws-amplify';

const listener = (data: any) => {
    switch (data.payload.event) {
        case 'signIn':
            console.log('user signed in');
            break;
        case 'signOut':
            console.log('user signed out');
            break;
    }
};

export const listenToAuthEvents = () => {
    Hub.listen('auth', listener);
};
