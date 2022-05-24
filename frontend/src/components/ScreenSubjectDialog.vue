<template>
    <v-overlay
        :value="showDialog"
    >
        <v-card
            height="500px"
            width="500px"
            color="white"
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
            
            <v-card-title class="px-5 pb-10 grey--text text-subtitle">Completați informațiile subiectului</v-card-title>

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
                    v-model="subject.screeningDate"
                    label="Introduceți data vizitei"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    class="mx-5 mt-5"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="subject.screeningDate"
                @input="menu = false"
                ></v-date-picker>
            </v-menu>

            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="subject.birthDate"
                    label="Introduceți data nașterii a subiectului"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    class="mx-5 mt-5"
                ></v-text-field>
                </template>
                <v-date-picker
                v-model="subject.birthDate"
                @input="menu2 = false"
                ></v-date-picker>
            </v-menu>

            <v-select
                :items="genders"
                v-model="subject.sex"
                label="Introduceți genul subiectului"
                class="mx-5 mt-5"
            ></v-select>

            <div class="text-error px-10" v-html="error"/>

            <v-btn
                color="#406E8E"
                dark
                absolute
                right
                align-center
                class="finish-button"
                @click="screenSubject"
            >
                Finalizare
            </v-btn>
        </v-card>
    </v-overlay>
</template>

<script>
import SubjectsService from '../services/SubjectsService'
import VisitsService from '../services/VisitsService'
import MedicationService from '../services/MedicationService'

export default {
    data () {
        return {
            subject: {
                screeningDate: '',
                birthDate: '',
                sex: '',
                index: '',
                medicationCode: '',
                status: 'Randomizat',
                lastAppointmentId: '',
                nextAppointmentId: ''
            },
            menu: false,
            menu2: false,
            genders: [
                'Masculin',
                'Feminin',
                'Altceva'
            ],
            error: null
            
        }
    },
    props: ['showDialog'],
    methods: {
        async screenSubject() {
            this.error = null

            if (!this.subject.screeningDate || !this.subject.birthDate || !this.subject.sex) {
                this.error = 'Vă rugăm să completați toate câmpurile '
                return
            }

            this.subject.lastAppointmentId = this.subject.screeningDate

            if (localStorage.getItem('medCode') && localStorage.getItem('medCode') === 'A') {
                localStorage.setItem('medCode' , 'B')
            } else {
                localStorage.setItem('medCode' , 'A')
            }

            this.subject.medicationCode = localStorage.getItem('medCode')

            const medication = await MedicationService.assign(this.subject.medicationCode)

            if (!medication.data) {
                this.error = "Ne pare rau. Nu sunt medicamente disponibile."
                return
            }

            if (localStorage.getItem('index')) {
                localStorage.setItem('index' , (parseInt(localStorage.getItem('index')) + 1).toString())
            } else {
                localStorage.setItem('index' , '1003')
            }

            this.subject.index = localStorage.getItem('index')
            try {
                const subject = await SubjectsService.post(this.subject)
                this.addVisit(subject, medication);
                this.$emit('closeDialog')
            } catch (err) {
                console.log(err)
            }
            
        },
        async addVisit(subject, medication) {
            this.updateMedication(medication.data)
            await VisitsService.post({
                name: 'Screening',
                subjectId: subject.data.id,
                date: new Date(),
                visitIndex: 0,
                medicationId: medication.data.id
            })
        },
        async updateMedication(medication) {
            await MedicationService.update(medication.id, {
                type: medication.type,
                status: 'Asignat'
            })
        }
    }
}
</script>

<style>
.finish-button {
    bottom: 50px;
}

.text-error {
  color: red;
}
</style>