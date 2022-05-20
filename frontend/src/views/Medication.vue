<template>
<div class="container">
	<v-row>
		<v-col cols="9">
			<v-card
				class="pa-10"
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
						color="#74e3e2"
						dark
						right
						align-center
						class="mx-4 mb-4"
						@click="addVisit()">
						<v-icon>mdi-plus</v-icon>
						Adaugă medicamente
					</v-btn>
				</v-card-title>

				<v-data-table
					v-if="medications"
					:headers="headers"
					:items="medications"
					:search="search"
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
				class="pa-10"
				height="200px"
			>
				<v-data-table
					:headers="headers"
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
			headers: [
				{ text: 'Tip medicament', value: 'type' },
				{ text: 'Cantitate', value: 'qty' }
			],
			typeA: 0,
			typeB: 0
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
		}
	},
	async mounted () {
		this.medications = (await MedicationService.index()).data

		for (let i = 0; i < this.medications.length; i++) {
			if (this.medications[i].type == 'A') {
				this.typeA++
			} else {
				this.typeB++
			}
		}
	},
	methods: {
		addVisit () {

		}
	}
}
</script>

<style lang="css" scoped>
.align-text {
	text-align: center;
}

.align-search {
	margin-right: 30px;
}

</style>
