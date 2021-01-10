import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
import "@fortawesome/fontawesome-free/css/all.css";
import "../../node_modules/@mdi/font/css/materialdesignicons.min.css";
import "../assets/css/custom.css";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi' || 'fa'
    },
    theme: {
        themes: {
            light: {
                background: colors.grey.lighten2,
            },
            dark: {
                background: colors.shades.white,
            }
        }
    }
});
