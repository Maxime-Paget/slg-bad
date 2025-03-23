<template>
    <header class="topbar">
        <img src="../assets/icons/logo.svg" alt="logo" class="topbar__logo">
        <nav class="topbar__redirects">
            <ul class="topbar__redirects__list">
                <li class="topbar__redirects__list__item">
                    <NuxtLink to="/#home">Accueil</NuxtLink>
                </li>
                <li class="topbar__redirects__list__item">
                    <NuxtLink to="/#planning">Planning</NuxtLink>
                </li>
                <li class="topbar__redirects__list__item">
                    <NuxtLink to="/#contact">Contact</NuxtLink>
                </li>
                <li class="topbar__redirects__list__item">
                    <NuxtLink to="/profile">Mon Profil</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss">
@use '../assets/sass/abstract' as *;

.topbar {
    background-color: var(--clr-background-dark-high);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    max-height: 10%;
    @include gap(sm);
    @include padding(sm);

    &__logo {
        aspect-ratio: 1/1;
        height: 76px;
    }

    &__redirects__list {
        text-transform: uppercase;
        list-style: none;
        display: flex;
        flex-direction: row;
        @include gap(sm);

        a {
            color: var(--clr-text-light-medium);
            text-decoration: none;
        }
    }
}

@media screen and (min-width: 1080px) {
    .topbar {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        max-height: 10%;
    }
}

@media screen and (max-width: 430px) {
    .topbar {
        &__redirects__list {
            display: none;
        }
    }
}
</style>