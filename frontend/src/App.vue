<template>
    <div class="" id="app">
        <CombinationForm />
    </div>
</template>

<script>
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CombinationForm from './components/CombinationForm.vue';
export default {
    name : 'App',
    components :{
        CombinationForm

    },
    data(){
        return {
            Combination :{
                name :'Akshay'
            }
        }
    }
}
</script>