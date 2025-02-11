const { writeFile } = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const environmentFileContent = `
export const environment = {
  production: true,
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY || 'default-firebase-key'}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || 'default-auth-domain'}',
    projectId: '${process.env.FIREBASE_PROJECT_ID || 'default-project-id'}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET || 'default-storage-bucket'}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID || 'default-messaging-id'}',
    appId: '${process.env.FIREBASE_APP_ID || 'default-app-id'}',
    measurementId: '${process.env.FIREBASE_MEASUREMENT_ID || 'default-measurement-id'}'
  }
};
`;

writeFile(targetPath, environmentFileContent, (err) => {
  if (err) {
    console.error('❌ Error al generar environment.prod.ts:', err);
  } else {
    console.log('✅ environment.prod.ts generado con éxito.');
  }
});
