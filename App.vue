<template>
    <div class="app darktheme">
        <TopBar></TopBar>
        <div class="background-image">
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
        </div>
        <section id="more-info" class="more-info"></section>
        <section id="planning" class="planning">
            <p class="planning__title">
                Planning des séances
            </p>
            <p class="planning__description">
                Choisissez un créneau
            </p>
            <i class="planning__caption">
                Le gymnase ne sera ouvert qu'en présenced d'un bénévole
            </i>
            <div class="planning__fulling">
                <p class="planning__fulling__title">Nombre de joueurs inscrits sur le créneau</p>
                <div class="planning__fulling__values">
                    <p class="planning__fulling__values__value planning__fulling__values__value--low">Faible</p>
                    <p class="planning__fulling__values__value planning__fulling__values__value--normal">Normal</p>
                    <p class="planning__fulling__values__value planning__fulling__values__value--high">Élevé</p>
                    <p class="planning__fulling__values__value planning__fulling__values__value--very-high">Très élevé
                    </p>
                </div>
            </div>
            <p class="planning__calendar-title">Jeux Libre</p>
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
    background: linear-gradient(to bottom, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, .5) 30%, rgba(0, 0, 0, .8) 80%, rgba(0, 0, 0, .9) 100%);
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
        line-height: unset;
        color: var(--clr-text-inverse-high);
        text-align: center
    }

    &__slogan {
        @include title-2xl;
        color: var(--clr-text-inverse-high);
        max-width: 40ch;
        text-align: center;
    }



    &__actions {
        display: flex;
        flex-wrap: wrap;
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

.background-image {
    width: 100%;
    background-image: url('./public/assets/icons/badShuttlecock.svg');
    background-size: cover;
    background-position: 50% 0;
    background-repeat: no-repeat;
    background-attachment: scroll;
}

.planning {
    @include padding(sm);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include gap(sm);

    &__title {
        @include title-lg;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
        color: var(--clr-text-primary-low);
    }

    &__description {
        @include title-2xl;
        font-weight: unset;
        text-align: center;
        color: var(--clr-text-primary-low);
    }

    &__caption {
        @include body-sm;
        color: var(--clr-text-primary-low);
        text-align: center;
    }

    &__fulling {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        @include gap(sm);
        border: 1px solid var(--clr-border-placeholder);
        @include padding(sm);
        width: fit-content;

        &__values {
            display: flex;
            justify-content: center;
            @include gap(md);

            &__value {
                display: flex;
                @include gap(xs);
                align-items: center;

                &::before {
                    content: '';
                    padding: 10px;
                    border-radius: 50px;
                    display: inline-block;
                    aspect-ratio: 1/1;
                    border-width: 2px;
                    border-style: solid;
                }

                &--low {
                    color: var(--clr-text-placeholder);

                    &::before {
                        border-color: var(--clr-border-placeholder);
                    }
                }

                &--normal {
                    color: var(--clr-text-positive);

                    &::before {
                        border-color: var(--clr-border-positive);
                    }
                }

                &--high {
                    color: var(--clr-text-warn);

                    &::before {
                        border-color: var(--clr-border-warn);
                    }
                }

                &--very-high {
                    color: var(--clr-text-negative);

                    &::before {
                        border-color: var(--clr-border-negative);
                    }
                }
            }
        }

    }

    &__calendar-title {
        @include title-xl;
        text-align: center;
    }
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