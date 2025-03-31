<template>
    <div class="app darktheme">
        <TopBar></TopBar>
        <section class="home" id="home">
            <p class="home__club">
                Saint louis de gonzague badminton
            </p>
            <p class="home__slogan">
                Club de Badminton au centre de Limoges
            </p>
            <div class="home__actions">
                <button class="home__actions__button home__actions__button--booking">
                    <NuxtLink to="#planning">
                        Réserver un créneau
                    </NuxtLink>
                </button>
                <button class="home__actions__button home__actions__button--more-info">
                    <NuxtLink to="#more-info">
                        En savoir plus
                    </NuxtLink>
                </button>
            </div>
            <i class="home__sub-info">Club omnisports affilié à la Fédération Française de Badminton</i>
        </section>
        <section id="more-info" class="more-info"></section>
        <section id="planning" class="planning">
            <Calendar class="planning__calendar" />
        </section>
        <section id="contact" class="contact"></section>
    </div>
</template>

<script setup lang="ts">
import Calendar from '@/public/components/Calendar/Calendar.vue';
import TopBar from './public/components/TopBar.vue';

</script>

<style lang="scss" scoped>
@use './public/assets/sass/abstract/' as *;

.app {
    @include use-font-family;
}

.home {
    background-image: url('./public/assets/icons/badShuttlecock.svg');
    background-size: cover;
    background-position: 50% 0;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-color: rgba(0, 0, 0, 0.5);
    background-blend-mode: lighten;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    position: relative;
    @include gap(lg);
    @include padding(2xl);

    &__club {
        @include title-sm;
        text-transform: uppercase;
        font-weight: 700;
        color: var(--clr-text-inverse-high);
    }

    &__slogan {
        @include title-xl;
        color: var(--clr-text-inverse-high);
        max-width: 40ch;
        text-align: center;
    }

    &__actions {
        display: flex;
        @include gap(md);
        width: 60%;
        align-items: center;
        justify-content: center;

        &__button {
            @include padding(sm);
            border-radius: 5px;
            text-transform: uppercase;
            white-space: nowrap;
            width: fit-content;

            &:hover {
                cursor: pointer;
            }

            &--booking {
                background-color: var(--clr-background-primary-high);
                border: 1px solid var(--clr-border-primary-high);
                color: var(--clr-text-inverse-high);
            }

            &--more-info {
                background-color: transparent;
                border: 2px solid var(--clr-border-light);
                color: var(--clr-text-inverse-high);

            }

            & a {
                color: var(--clr-text-inverse-high);
                text-decoration: none;
            }
        }
    }

    &__sub-info {
        color: var(--clr-text-inverse-high);
        font-size: 0.8rem;
        text-align: center;
    }
}

.planning {
    @include padding(sm);
}

@media screen and (min-width: 1080px) {
    .home {
        margin-top: 85px
    }

    .planning {
        @include padding(xl);
        display: flex;
        justify-content: center;

        &__calendar {
            max-width: 65%;
        }
    }
}
</style>