<template>
<div class="container">
	<v-row class="">
		<v-col cols="6" class="h-100">
			<v-card width="30vw" class="reports-card">
				<v-card-title>
					Rapoarte subiecți
				</v-card-title>
				<v-card-content>
					<v-btn
						color="#406E8E"
						dark
						right
						align-center
						class="mx-4 mb-4"
						@click="addVisit()">
						Subiecți
					</v-btn>
				</v-card-content>
			</v-card>
		</v-col>
		<v-col cols="6">
			<v-card width="30vw" class="reports-card">
				<v-card-title>
					Rapoarte medicamente
				</v-card-title>
				<v-card-content>
					<v-btn
						color="#406E8E"
						dark
						right
						align-center
						class="mx-4 mb-4"
						@click="addVisit()">
						Medicamente
					</v-btn>
				</v-card-content>
			</v-card>
		</v-col>
	</v-row>
</div>
</template>

<script>
export default {
	data () {
		return {

		}
	}
}
</script>

<style lang="css" scoped>
.reports-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
	padding: 5vh 0;
	margin: 20vh auto 0 auto;
}

.reports-card:nth-child(2) {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
	padding: 5vh 0;
	margin-top: 20vh;
}
</style>
