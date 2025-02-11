export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'your-firebase-api-key',  // Aquí debes poner los valores generados dinámicamente por el script
    authDomain: 'your-firebase-auth-domain',
    projectId: 'your-firebase-project-id',
    storageBucket: 'your-firebase-storage-bucket',
    messagingSenderId: 'your-firebase-messaging-sender-id',
    appId: 'your-firebase-app-id',
    measurementId: 'your-firebase-measurement-id'
  }
};


// import process from 'process'

// const getEnvVar = (key: string, fallback: string) => {
//   return typeof process !== 'undefined' && process.env[key] ? process.env[key] : fallback;
// };

// export const environment = {
//   production: true,
//   firebaseConfig: {
//     apiKey: getEnvVar('FIREBASE_API_KEY', 'default-firebase-key'),
//     authDomain: getEnvVar('FIREBASE_AUTH_DOMAIN', 'default-auth-domain'),
//     projectId: getEnvVar('FIREBASE_PROJECT_ID', 'default-project-id'),
//     storageBucket: getEnvVar('FIREBASE_STORAGE_BUCKET', 'default-storage-bucket'),
//     messagingSenderId: getEnvVar('FIREBASE_MESSAGING_SENDER_ID', 'default-messaging-id'),
//     appId: getEnvVar('FIREBASE_APP_ID', 'default-app-id'),
//     measurementId: getEnvVar('FIREBASE_MEASUREMENT_ID', 'default-measurement-id')
//   }
// };
