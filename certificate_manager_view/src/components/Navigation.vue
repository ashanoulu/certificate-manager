<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Certification Manager</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/create-new-certification">New Certification <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/view-certification">Certification List</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
    export default {
        name: "navigation-view",
        mounted() {
        },
        data(){
            return {
            }
        },
        methods: {
        }
    }
</script>

<style scoped>

</style>
