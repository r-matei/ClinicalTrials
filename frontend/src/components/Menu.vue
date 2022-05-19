<template>
    <v-toolbar
        short
        color="#74e3e2"
        height="100px"
    >
        <router-link to="/" class="menu-item">
            <img class="logo" :src="img.url" :alt="img.alt"/>
        </router-link>

        <v-spacer></v-spacer>

        <div class="menu-items">
            <router-link to="/subjects" class="menu-item">Subiecti</router-link>
            
            <router-link to="/medication" class="menu-item">Medicamente</router-link>

            <router-link to="/reports" class="menu-item">Rapoarte</router-link>
        </div>
    </v-toolbar>
</template>

<script>
export default {
    data () {
        return {
            img: {
                url: require('../assets/logo.png'),
                alt: 'Logo'
            },
        }
    }
}
</script>

<style lang="css" scoped>
.logo {
    width: 120px;
    height: auto;
}

.menu-items {
    display: flex;
    align-items: flex-start;
    gap: 20px;
}

.menu-items a {
    color: #0a7378;
    text-decoration: none;
}

.menu-items a:link {
    color: #0a7378;
    text-decoration: none;
}

.menu-items a:hover {
    color: white;
    text-decoration: none;
}
</style>
