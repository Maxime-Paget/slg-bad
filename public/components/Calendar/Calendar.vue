<template>
    <table class="calendar">
        <thead class="calendar__header">
            <tr class="calendar__header__month">
                <button @click="previous" class="calendar__header__month__previous">
                    <ArrowIcon direction="left" />
                </button>
                <span class="calendar__header__month__value">{{ translatedMonth }} {{ currentYear }}</span>
                <button @click="next" class="calendar__header__month__next">
                    <ArrowIcon direction="right" />
                </button>
            </tr>
            <tr class="calendar__header__days">
                <th class="calendar__header__days__day">Lun</th>
                <th class="calendar__header__days__day">Mar</th>
                <th class="calendar__header__days__day">Mer</th>
                <th class="calendar__header__days__day">Jeu</th>
                <th class="calendar__header__days__day">Ven</th>
                <th class="calendar__header__days__day">Sam</th>
                <th class="calendar__header__days__day">Dim</th>
            </tr>
        </thead>
        <tbody class="calendar__weeks">
            <tr v-for="(week, index) in weeksArray" :key="index" class="week">
                <td v-for="(dayitem, index) in week" :key="index" class="week__day" @click="activeDay = dayitem">
                    <span class="week__day__number" :class="{
                        'week__day__number--today': dayitem.day === today.day && dayitem.month === today.month + 1,
                        'week__day__number--disabled': new Date(dayitem.year, dayitem.month - 1, dayitem.day) < new Date(today.year, today.month, today.day),
                    }">
                        {{ dayitem.day }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { startOfMonth, endOfMonth, eachDayOfInterval, format, eachWeekOfInterval, } from 'date-fns';
import { fr } from 'date-fns/locale';
import ArrowIcon from '../Icons/ArrowIcon.vue';

const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
}

const currentYear = ref(today.year);
const currentMonth = ref(today.month);
const currentDay = (today.day);

const activeDay = computed(() => {
    return {
        year: currentYear.value,
        month: currentMonth.value,
        day: currentDay,
    };
});

function previous() {
    currentMonth.value -= 1;
}

function next() {
    currentMonth.value += 1;
}

watch(currentMonth, (newMonth, oldMonth) => {
    const monthsNumber = 12;

    // add 1 to the month becasue the month is 0-indexed
    const oldMonthIndex = ((oldMonth) % monthsNumber + monthsNumber) % monthsNumber
    const newMonthIndex = ((newMonth % monthsNumber) + monthsNumber) % monthsNumber

    // a 0 modulo index means we are in january
    // a 11 modulo index means we are in december
    if (oldMonthIndex === 11 && newMonthIndex === 0) {
        currentYear.value += 1;
    } else if (oldMonthIndex === 0 && newMonthIndex === 11) {
        currentYear.value -= 1;
    }

    currentMonth.value = newMonthIndex;
});

const weeksArray = computed(() => {
    const start = startOfMonth(new Date(currentYear.value, currentMonth.value));
    const end = endOfMonth(new Date(currentYear.value, currentMonth.value));
    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1, locale: fr });

    return weeks.map((weekStart) => {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6); // Add 6 days to get the end of the week
        return eachDayOfInterval({ start: weekStart, end: weekEnd }).map((date) => ({
            day: parseInt(format(date, 'd', { locale: fr })),
            month: parseInt(format(date, 'M', { locale: fr })),
            year: parseInt(format(date, 'yyyy', { locale: fr })),
        })
        );
    });
});

const translatedMonth = computed(() => {
    return format(new Date(currentYear.value, currentMonth.value), 'MMMM', { locale: fr });
});

</script>

<style lang="scss" scoped>
@use '@/public/assets/sass/abstract/' as *;

.calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: fit-content;
    height: fit-content;

    &__header {
        width: 100%;
        display: flex;
        flex-direction: column;

        &__month {
            background-color: var(--clr-background-primary-high);
            outline: 1px solid var(--clr-border-primary-high);
            display: flex;
            justify-content: space-between;
            align-items: center;
            @include padding(sm);

            &__value {
                @include title-xs;
                color: var(--clr-text-inverse-high);
                border: 1px solid var(--clr-border-high);
                text-transform: uppercase;
                font-weight: 800;
            }
        }

        &__days {
            display: flex;
            width: 100%;
            justify-content: space-between;
            @include vertical-padding(sm);
            background-color: var(--clr-background-primary-low);
            color: var(--clr-text-inverse-high);
            outline: 1px solid var(--clr-border-primary-low);

            &__day {
                width: 100%;
                text-align: center;
                text-transform: uppercase;
                @include body-xs;
            }
        }
    }

    &__weeks {
        width: 100%;
    }
}

.week {
    width: 100%;
    display: flex;

    &__day {
        display: flex;
        justify-content: center;
        align-items: center;
        outline: 1px solid var(--clr-border-medium);
        width: 100%;
        aspect-ratio: 1/1;
        background-color: var(--clr-background-high);

        &:hover {
            cursor: pointer;

            & .week__day__number {
                background-color: var(--clr-background-primary-low);
                color: var(--clr-text-inverse-high);
            }

            &:has(.week__day__number--disabled) {
                cursor: not-allowed;
            }
        }


        &:has(.week__day__number--disabled) {
            background-color: var(--clr-background-tertiary-low);
        }

        &__number {
            display: block;
            border-radius: 100%;
            text-align: center;
            align-content: center;
            @include body-sm;
            font-weight: 800;
            width: 4ch;
            aspect-ratio: 1/1;

            &--disabled {
                color: var(--clr-text-medium) !important;
                background-color: transparent !important;
            }

            &--today {
                background-color: var(--clr-background-secondary-medium);
            }
        }
    }
}
</style>