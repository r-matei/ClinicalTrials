<template>
    <v-overlay
        :z-index="zIndex"
        :value="showDialog">
        <v-card
            height="200px"
            width="500px"
            color="white"
            align="center"
            class="pa-15"
        >
            <p class="tab-text">{{ error }}</p>
            <v-btn
            color="#76C6D1"
            dark
            center
            align-center
            class="mx-15"
            @click="$emit('closeDialog')">
            Ok
            </v-btn>
        </v-card>
    </v-overlay>
</template>

<script>
export default {
    props: ['showDialog', 'error'],
}
</script>

<style lang="scss" scoped>
.tab-text {
  color: #616161;
  margin-bottom: 20px;
}

</style>