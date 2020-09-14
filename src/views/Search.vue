<template>
  <q-page class="container">
    <div class="wrapper">
      <div class="heading">
        <div class="text-h4">Where next?</div>
      </div>
    </div>
    <div class="search__options q-pa-sm">
      <q-select
        class="home-icons search__options--input search__departure"
        v-model="departure"
        use-input
        hide-selected
        fill-input
        clearable
        label="Departure city"
        option-value="code"
        option-label="code"
        :options="options"
        @filter="fuzzySearchFilterFn"
      >
        <template v-slot:before>
          <q-icon size="lg" name="flight_takeoff" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label v-html="scope.opt.name" />
              <q-item-label caption>{{ scope.opt.code }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        class="home-icons search__options--input search__arrival"
        v-model="arrival"
        use-input
        hide-selected
        fill-input
        clearable
        label="Arrival city"
        option-value="code"
        option-label="code"
        :options="options"
        @filter="fuzzySearchFilterFn"
      >
        <template v-slot:before>
          <q-icon size="lg" name="flight_land" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label v-html="scope.opt.name" />
              <q-item-label caption>{{ scope.opt.code }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        class="search__date search__options--input"
        v-model="departureDate"
        label="Pick a date"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:before>
          <q-icon size="lg" name="calendar_today" />
        </template>
        <template v-slot:append>
          <q-icon name="calendar_today" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="departureDate"
                :options="dateSelectionLimit"
                no-unset
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="wrapper">
      <q-btn
        @click="search"
        class="cta__button"
        color="secondary"
        icon="keyboard_arrow_right"
        label="Search flights"
        :disable="
          !$v.departure.isAirport ||
            $v.departure.$invalid ||
            !$v.arrival.isAirport ||
            $v.arrival.$invalid
        "
      >
      </q-btn>
    </div>
  </q-page>
</template>

<script>
// @ts-nocheck
import airports from "../store/catalog/airports.json";
import Fuse from "fuse.js";
import { date } from "quasar";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

/**
 * Validate given input against list of valid IATA airports
 * @param {string} value - Given airport input by customer
 * @param {object} vm - Vue scope so outer functions can access store/Vue data
 * @return {boolean} - Boolean whether given airport is a valid IATA airport from airport list
 */
const isAirport = (value, vm) => {
  // TODO: debounce or throttle this function in compliance with vuelidate
  return vm.suggestionList.some(
    airport => airport.sublabel === value?.sublabel
  );
};

export default {
  /**
   *
   * Search view displays options for searching a flight given a departure, arrival and a date.
   */
  name: "Search",
  mixins: [validationMixin],
  validations: {
    departure: {
      required,
      minLength: minLength(3),
      isAirport
    },
    arrival: {
      required,
      minLength: minLength(3),
      isAirport
    }
  },
  data() {
    return {
      /**
       * @param {object} departure - Departure city chosen by the customer
       * @param {object} arrival - Arrival city chosen by the customer
       * @param {object} departureDate - Departure date chosen by the customer
       * @param {object} suggestionList - Parsed list of airports offered as auto-suggestion
       */
      departure: "",
      arrival: "",
      departureDate: date.formatDate(Date.now(), "YYYY/MM/DD"),
      suggestionList: airports,
      options: airports
    };
  },
  methods: {
    /**
     * search method collects form data, create queryStrings, and redirects to Search Results view
     */
    search() {
      // NOT YET CONNECTED
      // this.$router.push({
      //   name: "searchResults",
      //   query: {
      //     date: date.formatDate(this.departureDate, "DD-MM-YYYY"),
      //     departure: this.departure.code,
      //     arrival: this.arrival.code
      //   }
      // });
    },
    /**
     * fuzzySearchFilter method uses Fuse library to easily find airports whether that is city, IATA, initials, etc.
     */
    fuzzySearchFilterFn(val, update, abort) {
      if (val.length < 3) {
        abort();
        return;
      }

      update(() => {
        const token = val.toLowerCase();
        var fuseOptions = {
          shouldSort: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 10,
          minMatchCharLength: 3,
          keys: ["city", "sublabel"]
        };
        const fuse = new Fuse(this.suggestionList, fuseOptions);
        const result = fuse.search(token);
        this.options = result.map(item => item.item);
      });
    },
    dateSelectionLimit(departureDate) {
      return departureDate >= date.formatDate(Date.now(), "YYYY/MM/DD");
    }
  }
};
</script>

<style lang="sass" scoped>

.search__options--input
  padding: 0.3rem 1.5rem
  max-width: 30rem
  margin: auto
</style>
