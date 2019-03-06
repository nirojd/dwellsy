<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text">Dwellsy Rental Platform</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat router to="/">Home</v-btn>
      <v-btn flat router to="/about">About</v-btn>
      <v-btn flat router to="/rental">Rental</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>