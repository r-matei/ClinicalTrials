<template>
<div class="container">
	<v-card
		class="pa-9"
		height="80vh"
	>
		<v-card-title>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="Caută"
				single-line
				hide-details
				class="align-search"
			></v-text-field>
			<v-btn
				color="#406E8E"
				dark
				right
				align-center
				class="mx-4 mb-4"
				@click="screenSubject()">
				Screening
			</v-btn>
		</v-card-title>

		<v-data-table
			v-if="subjects"
			:headers="headers"
			:items="subjects"
			:search="search"
		>
			<template v-slot:item="row">
				<router-link
				tag="tr"
				:to="{
					name: 'Subject',
					params: {
					subjectId: row.item.id
					}
				}">
					<td class="align-text">{{row.item.index}}</td>
					<td class="align-text">{{row.item.birthDate}}</td>
					<td class="align-text">{{row.item.sex}}</td>
					<td class="align-text">{{row.item.status}}</td>
				</router-link>
			</template>
		</v-data-table>

		<v-data-table
			v-if="!subjects"
			item-key="index"
			class="elevation-1"
			loading
			loading-text="Loading... Please wait"
		></v-data-table>
  	</v-card>
	<screen-subject-dialog :showDialog="screenSubjectDialog" @closeDialog="closeDialog"></screen-subject-dialog>
</div>
</template>

<script>
import SubjectService from '../services/SubjectsService'
import ScreenSubjectDialog from '../components/ScreenSubjectDialog.vue'

export default {
	components: {
		ScreenSubjectDialog
	},
	data () {
		return {
			subjects: [],
			search: '',
			headers: [
				{ text: 'Număr subiect', value: 'index' },
				{ text: 'Data nașterii', value: 'birthDate' },
				{ text: 'Gen', value: 'sex' },
				{ text: 'Status', value: 'status' }
			],
			screenSubjectDialog: false
		}
	},
	async mounted () {
		this.getSubjects()
	},
	methods: {
		async getSubjects() {
			this.subjects = (await SubjectService.index()).data
		},
		screenSubject() {
			this.screenSubjectDialog = true;
		},
		closeDialog() {
			this.screenSubjectDialog = false;
		}
	},
	watch: {
		screenSubjectDialog () {
			this.getSubjects()
		}
	}
}
</script>

<style lang="css" scoped>
.align-text {
	text-align: left;
}

.align-search {
	margin-right: 30px;
}
</style>
