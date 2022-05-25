<template>
    <v-overlay
        :z-index="zIndex"
        :value="showDialog">
        <v-card
            height="250px"
            width="500px"
            color="white"
            align="center"
            light
        >
            <v-btn
                fab
                @click="$emit('closeDialog')"
                icon
                absolute
                right
            >
                <v-icon color="grey">mdi-close-circle-outline</v-icon>
            </v-btn>
            
            <v-card-title class="px-5 pb-10 grey--text text-subtitle">Editați data ultimei vizite înregistrate</v-card-title>
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="newVisitDate"
                    label="Introduceți data vizitei"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    class="mx-5"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="newVisitDate"
                @input="menu = false"
                ></v-date-picker>
            </v-menu>
            <div class="text-error px-10" v-html="error"/>
            <v-btn
            color="#76C6D1"
            dark
            center
            align-center
            @click="editDate()">
            Editare dată
            </v-btn>
        </v-card>
    </v-overlay>
</template>

<script>
import VisitsService from '../services/VisitsService'

export default {
    props: ['showDialog', 'visit'],
    data () {
        return {
            menu: false,
            newVisitDate: '',
            error: null
        }
    },
    methods: {
        async editDate() {
            this.error = null

            if (!this.newVisitDate) {
                this.error = "Vă rugăm sa alegeți o dată validă"
                return
            }

            const visit = {
                name: this.visit.name,
                visitIndex: this.visit.visitIndex,
                subjectId: parseInt(this.$route.params.subjectId),
                date: this.newVisitDate,
                medicationId: this.visit.medicationId
            }

            await VisitsService.update(this.visit.id, visit)

            this.$emit('closeDialog')
        }
    }
}
</script>

<style lang="scss" scoped>

.text-error {
  color: red;
}

</style>