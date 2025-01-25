## 🎥 Demo

![Demo](public/assets/starvideo.gif)




# 🚀 Star Wars Starships App (Angular)

## 📌 Project Overview
This project is a **web application** designed to display and interact with data about **Star Wars starships**.

The app retrieves real-time data from the **Star Wars API (SWAPI)**, enabling users to:
- Browse a **list of starships**.
- View **detailed information** about each ship, including specifications and appearance in films.
- Manage **user authentication** (login & register) using Firebase Authentication.
- Secure access to specific routes via **authentication guards**.
---

## 🛠️ **Technologies Used**

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Karma](https://img.shields.io/badge/Karma-45D164?style=for-the-badge&logo=karma&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

---

## ⚙️ **Requirements**
To run this project locally, ensure you have:

- **Node.js** (version 14 or higher) installed.
- **Angular CLI** installed globally (`npm install -g @angular/cli`).
---

## 🚀 **Project Setup**
Follow these steps to set up and run the project locally:

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/Silvitui/Star-Wars.git
cd Star-Wars
```

### **2️⃣ Install dependencies**
```sh
npm install
```

## 🔑 Firebase Configuration

To prevent exposing sensitive credentials, this project uses an **`environment.ts`** file that is NOT included in the repository.  
Follow these steps to configure it:

1️⃣ **Create the file** `src/environments/environment.ts` in the project root.  
2️⃣ **Copy and paste the following code, replacing it with your Firebase credentials:**

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  }
};


### **3️⃣ Run the development server**
```sh
ng serve
```
Now, open your browser and navigate to:  
👉 `http://localhost:4200/`

---


