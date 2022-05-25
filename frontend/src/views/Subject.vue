<template>
    <v-row>
        <v-col cols="9" class="pa-7">
            <v-card class="ma-7">
                <v-card-title>
                    Detalii subiect
                </v-card-title>
                <v-card-content>
                    <v-row>
                        <v-col cols="6" class="py-5">
                            <div class="info-container">
                                <span class="subject-label">Număr pacient</span>
                                <v-chip
                                    class="subject-chip"
                                    label
                                >
                                    {{ subject.index }}
                                </v-chip>
                            </div>
                            
                            <div class="info-container">
                                <span class="subject-label">Data nașterii</span>
                                <v-chip
                                    class="subject-chip"
                                    label
                                >
                                    {{ subject.birthDate }}
                                </v-chip>
                            </div>

                            <div class="info-container">
                                <span class="subject-label">Sex</span>
                                <v-chip
                                    class="subject-chip"
                                    label
                                >
                                    {{ subject.sex }}
                                </v-chip>
                            </div>
                        </v-col>
                        <v-col cols="6">
                            <div class="info-container">
                                <span class="subject-label">Vizita următoare</span>
                                <v-chip
                                    class="subject-chip"
                                    label
                                    v-if="finishedVisits.length > 1"
                                >
                                    {{ finishedVisits[finishedVisits.length - 1].date }}
                                </v-chip>
                                <v-chip
                                    class="subject-chip"
                                    label
                                    v-else
                                >
                                    -
                                </v-chip>
                            </div>

                            <div class="info-container">
                                <span class="subject-label">Data ultimei vizite</span>
                                <v-chip
                                    class="subject-chip"
                                    label
                                >
                                    {{ subject.screeningDate }}
                                </v-chip>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-content>
            </v-card>
            <v-card class="ma-7">
                <v-card-title>
                    Vizite subiect
                </v-card-title>
                <v-card-content>
                    <v-data-table
                        :headers="headers"
                        :items="visits"
                        hide-default-footer
                    >
                        <template v-slot:item="row">
                            <tr>
                                <td class="align-text">{{row.item.name}}</td>
                                <td class="align-text">{{row.item.date}}</td>
                                <td class="align-text">{{row.item.medicationId}}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-content>
            </v-card>
        </v-col>  
        <v-col cols="3" class="pa-7">
            <v-btn
                color="#406E8E"
                dark
                right
                align-center
                class="ma-7 button"
                @click.prevent="addVisit()">
                Vizita următoare
            </v-btn>
            <v-btn
                color="#406E8E"
                dark
                right
                align-center
                class="mx-7 mb-7 button"
                @click.prevent="deleteVisit()">
                Ștergere vizită
            </v-btn>
            <v-btn
                color="#406E8E"
                dark
                right
                align-center
                class="mx-7 button"
                @click.prevent="editVisit()"
            >
                Editare dată
            </v-btn>
        </v-col> 
        <error-dialog :error="error" :showDialog="showErrorDialog"  @closeDialog="closeDialog"></error-dialog>
        <edit-date-dialog
            :showDialog="showEditDateDialog"
            :visit="finishedVisits[finishedVisits.length-1]"
            @closeDialog="closeEditDialog"
        />
    </v-row>
</template>
    
<script>
import SubjectService from '../services/SubjectsService'
import VisitsService from '../services/VisitsService'
import MedicationService from '../services/MedicationService'
import ErrorDialog from '../components/ErrorDialog.vue'
import EditDateDialog from '../components/EditDateDialog.vue'

export default {
    components: {
        ErrorDialog,
        EditDateDialog
    },
    data () {
        return {
            subject: {},
            nextAppointmentDate: '',
            lastAppointmentDate: '',
            showErrorDialog: false,
            showEditDateDialog: false,
            error: null,
            visits: [],
            finishedVisits: [],
            headers: [
                { text: 'Nume vizită', value: 'name' },
				{ text: 'Dată vizită', value: 'date' },
				{ text: 'Medicamente asignate', value: 'medicationId' }
            ]
        }
    },
    mounted () {
        this.getSubject(this.$route.params.subjectId)
        this.getVisits(this.$route.params.subjectId)
    },
    methods: {
        async getSubject(id) {
            this.subject = (await SubjectService.show(id)).data
        },
        async getVisits(id) {
            this.visits = [
                {
                    name: 'Screening',
                    date: '',
                    medicationId: null
                },
                {
                    name: 'Randomizare',
                    date: '',
                    medicationId: null
                },
                {
                    name: 'Vizita 2',
                    date: '',
                    medicationId: null
                },
                {
                    name: 'Finalizare tratament',
                    date: '',
                    medicationId: null
                },
            ] 
            this.finishedVisits = (await VisitsService.index(id)).data

            for (let i = 0; i < this.finishedVisits.length; i++) {
                
                if (this.finishedVisits[i].visitIndex === i) {
                    this.visits[i].date = this.finishedVisits[i].date
                    this.visits[i].medicationId = this.finishedVisits[i].medicationId
                }
            }
        },
        async addVisit() {
            const medication = await MedicationService.assign(this.subject.medicationCode)
            if (!medication.data) {
                this.error = "Ne pare rau. Nu sunt medicamente disponibile care pot fi asignate."
                this.showErrorDialog = true
                return
            }
            this.updateMedication(medication.data)
            const visit = {
                name: this.visits[this.finishedVisits.length].name,
                subjectId: this.$route.params.subjectId,
                visitIndex: this.finishedVisits.length,
                date: new Date(),
                medicationId: medication.data.id
            }

            await VisitsService.post(visit)
            this.getVisits(this.$route.params.subjectId)
        },
        async deleteVisit() {
            await VisitsService.delete(this.finishedVisits[this.finishedVisits.length-1].id)
            this.getVisits(this.$route.params.subjectId)
        },
        async finishTreatment() {

        },
        closeDialog() {
            this.showErrorDialog = false
        },
        closeEditDialog() {
            this.showEditDateDialog = false
            this.getVisits(this.$route.params.subjectId)
        },
        async updateMedication(medication) {
            await MedicationService.update(medication.id, {
                type: medication.type,
                status: 'Asignat'
            })
        },
        editVisit() {
            this.showEditDateDialog = true
        }
    }
}
</script>

<style lang="scss">
.info-container {
    margin: 20px;
    display: flex;
    justify-content: space-between;
}

.subject-label {

}

.subject-chip {
    width: 300px;
}

.button {
    width: 300px;
}

</style>
