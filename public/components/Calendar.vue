<template>
    <div class="calendar">
        <button @click="previous">Previous</button>
        <button @click="next">Next</button>
        <h1>Calendar</h1>
        {{ translateMonth }} {{ currentYear }}
        {{ calendarArray }}
    </div>
</template>

<script setup lang="ts">
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isLeapYear } from 'date-fns';
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
})


const calendarArray = computed(() => {
    const start = startOfMonth(new Date(currentYear.value, currentMonth.value));
    const end = endOfMonth(new Date(currentYear.value, currentMonth.value));
    return eachDayOfInterval({ start, end }).map((date) => parseInt(format(date, 'd', { locale: fr })));
});

const translateMonth = computed(() => {
    return format(new Date(currentYear.value, currentMonth.value), 'MMMM', { locale: fr });
});

</script>