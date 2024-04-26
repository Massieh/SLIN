THIS REACT WEB APP IS STILL UNDER DEVELOPMENT !!! </br>
You must add a firebase--config.json file to use this piece of code effectively </br>
1)Get into the settings of your firebase project </br>
2)Press the "add Firebase to yout web app" button </br>
3)Copy the config </br>

Here's the template for the file :</br>
</br>
import { initializeApp } from "firebase/app"; </br>
import { getAnalytics } from "firebase/analytics";</br>
import { getFirestore } from "firebase/firestore";</br>
import { getAuth } from "firebase/auth";</br>
</br>
const firebaseConfig = {Paste the config};</br>
</br>
const app = initializeApp(firebaseConfig);</br>
const analytics = getAnalytics(app);</br>
export const dataBase = getFirestore(app);</br>
export const auth = getAuth(app);</br>
