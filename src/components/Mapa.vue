<template>
  <v-card outlined :style="{height:config.alto}">
    <!-- style="height: 100%;margin-rigth:5px;" -->
    <v-card-title>Mapa</v-card-title>
    <v-card-text>
      <div style="position:absolute;top:30px;left:10px;right:10px;height:89%;width:98.5%;">
        <!-- style="height:100%;position:absolute;top:40px;left:10px;right:10px;height:89%;width:98.5%;" -->
        <v-row align="center" justify="start">
          <v-col cols="6">
            <v-text-field id="autocomplete" label="Buscar ubicacion en mapa" prepend-icon="place"></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn small color="default" @click="resetMapa">
              <v-icon left>clear</v-icon>Limpiar
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="stretch" justify="center" style="height: 95%;">
          <v-col cols="12">
            <div id="divMapa"></div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

const center = { name: "El Salvador", lat: 13.7841464, lng: -88.8778239 };
const zoom = 9.88;
const map_styles = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

export default {
  props:{
    config:{
      type:Object,
      default(){
        return {
          alto:'900px'
        }
      }
    }
  },
  async mounted() {
    const mapElemId = "divMapa";
    const apiKey = "AIzaSyBj7S9B5zCgK5KZWi6xt5n_v9guE7cf-2I";
    const el = this.$el.querySelector(`#${mapElemId}`);
    const config = { zoom, center, styles: map_styles };

    if (!apiKey) throw new Error("No API_KEY.");
    if (!el) throw new Error("No container for the map.");

    await GoogleMapsApiLoader({
      libraries: ["places"],
      apiKey: "AIzaSyBj7S9B5zCgK5KZWi6xt5n_v9guE7cf-2I" // optional
    })
      .then(google => {
        //if (!Map) throw new Error('No "google.maps.Map".');
        this.google = google;
        this.map = new this.google.maps.Map(el, config);

        this.map.addListener("rightclick", mapMouseEvent => {
          this.crearMarcador(
            mapMouseEvent.latLng.lat(),
            mapMouseEvent.latLng.lng()
          );
        });

        //Creando autocomplete
        this.crearAutocomplete();
      })
      .catch(err => {
        console.error(err);
      });
  },
  data() {
    return {
      google: null, //Representa la instancia del APi de google maps
      map: null, //Representa el mapa instanciadel a partir del Api de google
      lat: null, //Latitud actual
      lng: null, //Longitud actual
      autocomplete: null, //Representa la instancia del input para buscar lugares en el mapa
      place: null, //Representa un lugar buscado en el mapa,
      marker: null //Representa un marcador en el mapa
    };
  },
  methods: {
    onPlaceChanged() {
      let place = this.autocomplete.getPlace();

      if (place.geometry) {
        this.map.panTo(place.geometry.location);
        this.map.setZoom(15);
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();

        this.crearMarcador(this.lat, this.lng);
      }
    },
    toggleBounce(marker) {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    },
    crearMarcador(latitud, longitud) {
      this.lat = latitud;
      this.lng = longitud;

      if (this.marker == null) {
        this.marker = new this.google.maps.Marker({
          map: this.map,
          draggable: true,
          animation: this.google.maps.Animation.DROP,
          position: { lat: this.lat, lng: this.lng }
        });

        this.marker.addListener("click", this.toggleBounce(this.marker));

        let self = this;
        this.google.maps.event.addListener(this.marker, "drag", function(evt) {
          self.lat = evt.latLng.lat();
          self.lng = evt.latLng.lng();
          self.$emit("update:coordenadasPunto", {
            longitud: self.lng,
            latitud: self.lat
          });
        });
      } else {
        this.marker.setPosition({ lat: this.lat, lng: this.lng });
      }

      this.$emit("update:coordenadasPunto", {
        longitud: this.lng,
        latitud: this.lat
      });
    },
    resetMapa() {
      this.lat = center.lat;
      this.lng = center.lng;
      let latLng = new google.maps.LatLng(center.lat, center.lng);
      this.map.panTo(latLng);
      this.map.setZoom(zoom);

      if (this.marker != null) {
        this.marker.setMap(null);
        this.marker = null;
      }

      this.crearAutocomplete();
    },
    crearAutocomplete() {
      document.getElementById("autocomplete").value = "";
      this.autocomplete = null;
      this.autocomplete = new this.google.maps.places.Autocomplete(
        document.getElementById("autocomplete")
      );
      this.autocomplete.addListener("place_changed", this.onPlaceChanged);
    }
  }
};
</script>
<style>
#divMapa {
  border: solid 1px grey;
  width: 100%;
  height: 100%;
}
</style>