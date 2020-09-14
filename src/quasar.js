import Vue from "vue";

import "./styles/quasar.sass";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar, Loading, QSpinnerPuff } from "quasar";

// Set default loader for views
Loading.setDefaults({
  spinner: QSpinnerPuff,
  spinnerSize: 200, // px
});

Vue.use(Quasar, {
  config: {},
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {},
});
