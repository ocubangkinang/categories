<template>
<div class="panel panel-default">
	<div class="panel-heading">
		<img class="logo" src="/images/logo.png" alt="">
		<div class="reload-button" @click="reload()">Reload</div>
	</div>

	<div class="panel-body">
		<div class="list-header">
			<span v-if="currentUrl == '/json/main.json'">Pilih Kategori</span>
			<span v-else>Pilih Subkategori </span>
			<span class="float-right" @click="backToParent()">X</span>
		</div>
		<ul  class="list-group">
			<li v-for="category in currentData.categories"  class="list-group-item">
				<span v-if="category.sub != null">+ </span>
				<span v-else>- </span>
				<a :href="'#' + category.url" @click="fetchSubcategory(category)">{{ category.name }}
				<span class="float-right">{{ category.count }}</span></a>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				currentUrl: '/json/main.json',
				previousUrl: [],
				currentData: {
					categories: []
				}
			}
		},

		mounted() {
			this.fetchCategory(this.currentUrl);
		},

		methods: {
			toggleMenu() {
				this.showSideNav = !this.showSideNav;
			},

			fetchCategory($link) {
				var me = this;

				$.ajax({
					type: "GET",
					url: $link,
					success: function(response) {
						me.currentData = response;
					},
					error: function(response) {console.log(response);},
				});
			},

			fetchSubcategory(category) {
				this.previousUrl.push(this.currentUrl);

				if(category.sub != null) {
					this.currentUrl = '/json/' + category.sub;
					this.fetchCategory(this.currentUrl);
				}
			},

			backToParent() {
				if(this.previousUrl.length > 0) {				
					this.currentUrl = this.previousUrl.pop();
					this.fetchCategory(this.currentUrl);
				}
			},

			reload() {
				this.fetchCategory(this.currentUrl);
			}
		}
	}
</script>