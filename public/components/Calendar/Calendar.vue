<template>
    <div class="calendar">
        <div class="calendar__header">
            <button @click="previous" class="calendar__header__previous">Previous</button>
            <span>{{ translatedMonth }} {{ currentYear }}</span>
            <button @click="next" class="calendar__header__next">Next</button>
        </div>
        <table class="calendar__body">
            <thead>
                <tr>
                    <th>Lundi</th>
                    <th>Mardi</th>
                    <th>Mercredi</th>
                    <th>Jeudi</th>
                    <th>Vendredi</th>
                    <th>Samedi</th>
                    <th>Dimanche</th>
                </tr>
            </thead>
            <tbody class="calendar__body__weeks">
                <tr v-for="(week, index) in weeksArray" :key="index" class="week">
                    <td v-for="(day, index) in week" :key="index" class="week__day">
                        <span class="week__day__number" :class="{ 'week__day__number--today': day === currentDay }">
                            {{ day }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { startOfMonth, endOfMonth, eachDayOfInterval, format, eachWeekOfInterval, } from 'date-fns';
import { fr } from 'date-fns/locale';

const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
}

const currentYear = ref(today.year);
const currentMonth = ref(today.month);
const currentDay = (today.day);


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
        return eachDayOfInterval({ start: weekStart, end: weekEnd }).map((date) =>
            parseInt(format(date, 'd', { locale: fr }))
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
    height: fit-content;

    &__header {
        width: 100%;
    }

    &__body {
        list-style: none;
        width: 100%;
    }

}

.week {
    &__day {
        outline: 1px solid var(--clr-border-medium);
        @include padding(md);
        width: 1rem;
        aspect-ratio: 1/1;

        &__number {
            display: block;
            width: 4ch;
            height: 4ch;
            border-radius: 100%;
            margin: auto;
            text-align: center;
            align-content: center;
            // @include padding(sm);



            &--today {
                background-color: var(--clr-background-primary-medium);
            }
        }
    }
}
</style>