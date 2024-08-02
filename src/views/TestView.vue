
<template>
    <main class="container pt-7">
        <div id="c" :class="'bg-lightGray opacity-0 size-20 text-2xl md:text-[44px] text-white font-bold rounded-full flex justify-center items-center cursor-pointer '">
            10
         </div>
    </main>
</template>
<style>
#c:hover {
    background-color: brown;
    opacity: 1;
    transition-duration: 400ms;
    transition-property: all;
    transition-delay: unset;
    transition-timing-function: ease-in-out;
}
</style>