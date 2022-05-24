<template>
<div class="container">
	<v-row>
		<v-col cols="9">
			<v-card
				class="pa-9"
				height="auto"
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
					<input type="file" id="file" ref="file" accept=".csv" v-on:change="handleFileUpload($event)" hidden/>
					<v-btn
						color="#406E8E"
						dark
						right
						align-center
						class="mx-4 mb-4"
						ref="uploadBtn"
						@click="openDialog()">
						<v-icon>mdi-plus</v-icon>
						Adaugă medicamente
					</v-btn>
				</v-card-title>

				<v-data-table
					v-if="medications"
					:headers="headers1"
					:items="medications"
					:search="search"
					:items-per-page="10"
				>
					<template v-slot:item="row">
						<tr>
							<td class="align-text">{{row.item.id}}</td>
							<td class="align-text">{{row.item.type}}</td>
							<td class="align-text">{{row.item.status}}</td>
						</tr>
					</template>
				</v-data-table>

				<v-data-table
					v-if="!medications"
					item-key="id"
					class="elevation-1"
					loading
					loading-text="Loading... Please wait"
				></v-data-table>
			</v-card>
		</v-col>
		<v-col cols="3">
			<v-card
				class="pa-9"
				height="200px"
			>
				<v-data-table
					:headers="headers2"
					:items="medicationTypes"
					class="quantity-table"
					hide-default-footer
				>
					<template v-slot:item="row">
						<tr>
							<td class="align-text">{{row.item.type}}</td>
							<td class="align-text">{{row.item.qty}}</td>
						</tr>
					</template>
				</v-data-table>
			</v-card>
		</v-col>
	</v-row>
</div>
</template>

<script>
import MedicationService from '../services/MedicationService'

export default {
	data () {
		return {
			medications: [],
			search: '',
			headers1: [
				{ text: 'Id medicament', value: 'id' },
				{ text: 'Tip medicament', value: 'type' },
				{ text: 'Status medicament', value: 'status' }
			],
			headers2: [
				{ text: 'Tip medicament', value: 'type' },
				{ text: 'Cantitate', value: 'qty' }
			],
			typeA: 0,
			typeB: 0,
			file: '',
			content: [],
			parsed: false
		}
	},
	computed: {
		medicationTypes () {
			return [
				{
					type: 'A',
					qty: this.typeA
				},
				{
					type: 'B',
					qty: this.typeB
				}
			]
		},
	},
	async mounted () {
		this.getMedication()
	},
	methods: {
		async getMedication() {
			this.medications = (await MedicationService.index()).data

			for (let i = 0; i < this.medications.length; i++) {
				if (this.medications[i].type == 'A') {
					this.typeA++
				} else {
					this.typeB++
				}
			}
		},
		openDialog() {
			this.$refs.file.click()
		},
		handleFileUpload(event) {
			this.file = event.target.files[0]
			this.parseFile()
		},
		parseFile() {
			this.$papa.parse(this.file, {
				header: true,
				skipEmptyLines: true,
				complete: async function(results) {
					this.content = results
					await MedicationService.upload(this.content.data)
					this.parsed = true
				}.bind(this)
			})
			location.reload()
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
