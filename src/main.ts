import './assets/main.css'

import { createApp } from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFutbol,  faAnchor, faFlask, faSun, faHandSpock, faBug, faMoon, faSnowflake, faLiraSign, faCar, faCat, faStar, faHandshake, faFaceSmile, faPizzaSlice, faFire, faBroom, faPlane, faRepeat, faRotate, faRotateRight } from '@fortawesome/free-solid-svg-icons'



import App from './App.vue'
import router from './router'


const app = createApp(App)

/* add icons to the library */
library.add(faFutbol,faAnchor,faFlask,faSun,faHandSpock,faBug,faMoon,faSnowflake,faLiraSign,faCar,faCat,faStar,faHandshake,faFaceSmile,faPizzaSlice,faFire,faBroom,faPlane,faRepeat,faRotateRight)


app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
