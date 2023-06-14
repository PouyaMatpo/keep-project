<template>
    <div>
      <header> <app-bar /></header>
        <div class="w-full text-center text-lg italic pt-8">
        Notes in Trash are deleted after 7 days.
        </div>
        <div class="flex flex-col mt-48">
            <div class="w-full text-center">
                <v-icon size="140">
                    mdi-trash-can-outline
                </v-icon>
            </div>
            <div class="w-full text-center text-3xl pt-3">
                No notes in Trash
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>