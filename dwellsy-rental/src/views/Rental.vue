<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Rental Real Estate</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :items="rentals" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.houseNumber }}</td>
        <td>
          <b>{{ props.item.houseNumber }}</b>
          <p>
            Address: {{props.item.street}} , {{props.item.city}}
            <br>
            {{props.item.state}}
          </p>
          <p>Postal Code: {{props.item.postalCode}}</p>
          <p>Number of Bedroom: {{props.item.bedroomNumber}}</p>
          <p>Full Bathroom: {{props.item.fullBathroomNumber}}</p>
          <p>Half Bathroom: {{props.item.halfBathroomNumber}}</p>
          <p>Parking: {{props.item.parkingSpacesIncludedNumber}} {{props.item.parkingSpacesAvailableNumber ? ' - ' + props.item.parkingSpacesAvailableNumber : ''}}</p>
        </td>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    url: "properties",
    headers: [
      {
        text: "House Number",
        align: "left",
        sortable: true,
        value: "houseNumber"
      },
      { text: "Properties", value: "properties", sortable: false }
    ],
    rentals: []
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      window.axios
        .get(this.$apiURL + this.url)
        .then(res => {
          this.rentals = res.data;
        })
        .catch(err => window.console.log(err));
    }
  }
};
</script>