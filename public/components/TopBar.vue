<template>
    <header class="topbar">
        <img src="../assets/icons/logo.svg" alt="logo" class="topbar__logo">
        <nav class="topbar__redirects">
            <ul class="topbar__redirects__list">
                <li class="topbar__redirects__list__item">
                    <NuxtLink to="#home">Accueil</NuxtLink>
                </li>
                <li class="topbar__redirects__list__item">
                    <NuxtLink to="#planning">Planning</NuxtLink>
                </li>
                <li class="topbar__redirects__list__item">
                    <NuxtLink to="#contact">Contact</NuxtLink>
                </li>
                <li class="topbar__redirects__list__item">
                    <NuxtLink to="profile">Mon Profil</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
@use '../assets/sass/abstract' as *;

.topbar {
    background-color: var(--clr-background-low);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 100%;
    @include gap(sm);
    @include padding(sm);
    border-bottom: 3px solid var(--clr-border-primary-high);

    &__logo {
        aspect-ratio: 1/1;
        height: 76px;
    }

    &__redirects__list {
        text-transform: uppercase;
        list-style: none;
        display: none;
        flex-direction: row;
        @include gap(sm);

        &__item {
            @include title-sm;
            font-weight: 600;
            @include padding(sm);
            border-radius: 5px;

            &:hover {
                background-color: rgba(255, 255, 255, .2);
            }
        }

        a {
            color: var(--clr-text-low);
            text-decoration: none;
        }
    }
}

@media screen and (min-width: 430px) {
    .topbar {
        &__redirects__list {
            display: flex;
        }
    }

    @media screen and (min-width: 1080px) {
        .topbar {
            position: fixed;
            top: 0;
            z-index: 1;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            display: flex;

            &__logo {
                height: 50px;
            }
        }
    }
}
</style>