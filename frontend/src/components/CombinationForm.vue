<template>
    <HomeNavbar />

    <div class="container">
        <form @submit.prevent="handleSubmit" autocomplete="off">
            <h1 class="text-center mt-4 display-4 text-white mt-5">Define Directory Name & Path </h1>
            <div class="row justify-content-around mt-4">
                <div class="col-md-6 col-sm-6 col-xs-6 col-lg-6 my-3">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="directoryName" v-model="SelectedCombination.DirectoryName" placeholder="">
                        <label for="directoryName">Directory Name</label>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6 col-lg-6 my-3">
                    <div class="form-floating">
                        <input type="text" class="form-control" v-model="SelectedCombination.DirectoryPath" id="directoryPath" placeholder="">
                        <label for="directoryPath">Directory Path</label>
                    </div>
                </div>
            </div>
            <h1 class="text-center display-4 mt-5 text-white">Select The Combination</h1>

            <div class="row justify-content-around mt-4">
                <div class="col-md-4 col-sm-4 col-lg-4 col-xs-4">
                    <select name="Tools" v-model="SelectedCombination.Tool" class="form-control-lg form-control my-3" @change="populateLanguages">
                        <option value="" selected disabled>Select Testing Tool</option>
                        <option value="selenium">Selenium</option>
                        <option value="playwright">Playwright</option>
                        <option value="cypress">Cypress</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-4 col-lg-4 col-xs-4">
                    <select name="Language" v-model="SelectedCombination.Language" class="form-control-lg form-control my-3" @change="populateTestRunners" :disabled="!SelectedCombination.Tool">
                        <option value="" selected disabled>Select Required Language</option>
                        <option v-for="(language,index) in availableLanguages" :value="language" :key="index">{{ language }}</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-4 col-lg-4 col-xs-4">
                    <select name="TestRunner" v-model="SelectedCombination.TestRunner" class="form-control-lg form-control my-3" :disabled="!SelectedCombination.Language">
                        <option value="" selected disabled>Select Required Test Runner</option>
                        <option v-for="(runner,index) in availableTestRunners" :value="runner" :key="index">{{ runner }}</option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-center mt-4">
                <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center my-2">
                    <button type="submit" class="btn btn-primary">Create Structure</button>
                </div>
                <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4 text-center my-2">
                    <button @click.prevent="clearDetails" class="btn btn-primary">Clear All Detail</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import HomeNavbar from './HomeNavbar.vue'
import axios from 'axios';

export default {
    name: 'CombinationForm',
    components: {
        HomeNavbar
    },
    data() {
        return {
            SelectedCombination: {
                Tool: '',
                Language: '',
                TestRunner: '',
                DirectoryName: '',
                DirectoryPath: ''
            },
            availableLanguages: [],
            availableTestRunners: []
        }
    },
    methods: {
        populateLanguages() {
            const tool = this.SelectedCombination.Tool;
            if (tool === 'selenium') {
                this.availableLanguages = ['Java', 'Python', 'JavaScript', 'TypeScript'];
            } else if (tool === 'playwright') {
                this.availableLanguages = ['JavaScript', 'TypeScript', 'Python', 'Java'];
            } else if (tool === 'cypress') {
                this.availableLanguages = ['JavaScript', 'TypeScript'];
            } else {
                this.availableLanguages = [];
            }
            this.SelectedCombination.Language = '';
            this.SelectedCombination.TestRunner = '';
        },
        populateTestRunners() {
            const tool = this.SelectedCombination.Tool;
            const language = this.SelectedCombination.Language;
            if (tool === 'selenium') {
                if (language === 'Java') {
                    this.availableTestRunners = ['JUnit', 'TestNG', 'Cucumber'];
                } else if (language === 'Python') {
                    this.availableTestRunners = ['unittest', 'pytest', 'nose2'];
                } else if (language === 'JavaScript' || language === 'TypeScript') {
                    this.availableTestRunners = ['Mocha', 'Jasmine', 'Jest', 'Cucumber'];
                } else {
                    this.availableTestRunners = [];
                }
            } else if (tool === 'playwright') {
                if (language === 'JavaScript' || language === 'TypeScript') {
                    this.availableTestRunners = ['Jest', 'Mocha', 'Jasmine', 'Cucumber'];
                } else if (language === 'Python') {
                    this.availableTestRunners = ['pytest', 'unittest', 'nose2'];
                } else if (language === 'Java') {
                    this.availableTestRunners = ['JUnit', 'TestNG', 'Cucumber'];
                } else {
                    this.availableTestRunners = [];
                }
            } else if (tool === 'cypress') {
                if (language === 'JavaScript' || language === 'TypeScript') {
                    this.availableTestRunners = ['Cypress (Built-in)', 'Jest', 'Mocha', 'Jasmine'];
                } else {
                    this.availableTestRunners = [];
                }
            } else {
                this.availableTestRunners = [];
            }
            this.SelectedCombination.TestRunner = '';
},
        handleSubmit() {
            axios.post('http://localhost:8000/api', this.SelectedCombination)
                .then(response => {
                    alert(response.data.status);
                })
                .catch(error => {
                    console.error('API Error:', error);
                });
        },
        clearDetails() {
            this.SelectedCombination = {
                Tool: '',
                Language: '',
                TestRunner: '',
                DirectoryName: '',
                DirectoryPath: ''
    };
}
    }
}
</script>

<style>

</style>
