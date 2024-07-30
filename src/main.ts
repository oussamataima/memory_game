import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFutbol,  faAnchor, faFlask, faSun, faHandSpock, faBug, faMoon, faSnowflake, faLiraSign, faCar } from '@fortawesome/free-solid-svg-icons'



import App from './App.vue'
import router from './router'
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons/faHandSparkles'

const app = createApp(App)

/* add icons to the library */
library.add(faFutbol,faAnchor,faFlask,faSun,faHandSpock,faBug,faMoon,faSnowflake,faLiraSign,faCar)


app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
