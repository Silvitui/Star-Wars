import { writeFile } from 'fs';

const firebaseApiKey = process.env.FIREBASE_API_KEY || 'default-firebase-key';
const firebaseAuthDomain = process.env.FIREBASE_AUTH_DOMAIN || 'default-auth-domain';
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID || 'default-project-id';

const environmentFileContent = `
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: '${firebaseApiKey}',
    authDomain: '${firebaseAuthDomain}',
    projectId: '${firebaseProjectId}'
  }
};
`;

writeFile('./src/environments/environment.prod.ts', environmentFileContent, (err) => {
  if (err) {
    console.error('❌ Error al generar environment.prod.ts:', err);
  } else {
    console.log('✅ environment.prod.ts generado con éxito.');
  }
});
