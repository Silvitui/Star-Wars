const { writeFileSync } = require('fs');

const targetPath = './src/environments/environment.prod.ts';
const envConfigFile = `
  export const environment = {
    production: true,
    firebaseConfig: {
      apiKey: '${process.env.FIREBASE_API_KEY}',
      authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
      projectId: '${process.env.FIREBASE_PROJECT_ID}',
      storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
      messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
      appId: '${process.env.FIREBASE_APP_ID}',
      measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}'
    }
  };
`;

writeFileSync(targetPath, envConfigFile);
console.log(`Environment file generated at ${targetPath}`);
