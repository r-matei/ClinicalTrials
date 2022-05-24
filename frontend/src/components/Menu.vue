<template>
    <v-toolbar
        color="#161925"
        max-height="100px"
        height="100px"
    >
        <div class="menu-item-logo">
            <router-link to="/">
                <img class="logo" :src="img.url" :alt="img.alt"/>
            </router-link>
        </div>

        <v-spacer></v-spacer>

        <div class="menu-items">
            <router-link to="/subjects" class="menu-item" :class="{'active-menu': $route.name === 'subjects'}">Subiecti</router-link>

            <router-link to="/medication" class="menu-item" :class="{'active-menu': $route.name === 'medications'}">Medicamente</router-link>

            <router-link to="/reports" class="menu-item" :class="{'active-menu': $route.name === 'reports'}">Rapoarte</router-link>
        </div>

        <v-spacer></v-spacer>

        <div class="user">
            <v-row>
                <v-col cols="3" align="center">
                    <v-avatar
                        size="60px"
                        >
                        <img
                            alt="Avatar"
                            src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png"
                        >
                    </v-avatar>
                </v-col>
                <v-col cols="9" class="text">
                    <strong v-html="'Andre Florete'"></strong>
                    <br>
                    <span>TYR-1710-98</span>
                    <br>
                    <span>Themis Administrator</span>
                </v-col>
            </v-row>
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

<style scoped>
.logo {
    width: 150px;
    height: auto;
}

.menu-item-logo {
    width: 300px;
}

.menu-items {
    margin: 20px 0;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    font-size: 20px;
    font-weight: 500;
}

.menu-items a {
    color: #CBF7ED;
    text-decoration: none;
}

.menu-items a:link {
    color: #CBF7ED;
    text-decoration: none;
}

.menu-items a:hover {
    color: #CBF7ED;
    text-decoration: none;
    border-bottom: solid 2px #CBF7ED;
}

.active-menu {
    color: #CBF7ED;
    text-decoration: none;
    border-bottom: solid 2px #CBF7ED;
}

.user {
    width: 300px;
}

.text {
    color: #CBF7ED;
}

</style>
