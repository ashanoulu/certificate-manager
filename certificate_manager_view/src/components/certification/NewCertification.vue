<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <label><h3>Create New Certificate</h3></label>
          <form class="search-form">
            <label>Name: *</label><br>
            <input v-model="name" class="input" type="text" placeholder="Name" required><br>
            <span v-for="error in errors" :key="error.id">
              <span class="error-msg" v-if="error.path == 'name'">{{error.msg}}</span>
            </span><br>

            <label>Description: *</label><br>
            <input v-model="description" class="input" type="text" placeholder="Description" required><br>
            <span v-for="error in errors" :key="error.id">
              <span class="error-msg" v-if="error.path == 'description'">{{error.msg}}</span>
            </span><br>

            <label>E-mail: *</label><br>
            <input v-model="email" class="input" type="email" placeholder="e-mail" required><br>
            <span v-for="error in errors" :key="error.id">
              <span class="error-msg" v-if="error.path == 'email'">{{error.msg}}</span>
            </span><br>

            <label>Issuer: *</label><br>
            <input v-model="issuer" class="input" type="text" placeholder="Issuer" required><br>
            <span v-for="error in errors" :key="error.id">
              <span class="error-msg" v-if="error.path == 'issuer'">{{error.msg}}</span>
            </span><br>

            <label>Expire date: *</label><br>
            <input v-model="expire_date" class="input" type="date" placeholder="Expire date (yyyy-MM-dd)" required><br>
            <span v-for="error in errors" :key="error.id">
              <span class="error-msg" v-if="error.path == 'expire_date'">{{error.msg}}</span>
            </span><br>

            <label>Issuer Code: </label><br>
            <input v-model="issuer_code" class="input" type="text" placeholder="Issuer Code"><br>
            <span v-for="error in errors" :key="error.id">
              <span class="error-msg" v-if="error.path == 'issuer_code'">{{error.msg}}</span>
            </span><br>

            <button @click.prevent="createNewCertificate" type="button" class="btn btn-primary certificate-btn">Create Certificate</button>
          </form>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
export default {
  name: "new-certification",
  components: {
  },
  data() {
    return {
      size: 10,
      page: 0,
      direction: 'ASC',
      name: '',
      description: '',
      email: '',
      issuer: '',
      expire_date: '',
      issuer_code: '',
      total_pages: 0,
      errors: {}
    }
  },
  mounted() {

  },
  methods: {
    createNewCertificate() {
      let loader = useLoading();
      loader.show();
      axios.post("/api/certificates", {
          name: this.name,
          description: this.description,
          email: this.email,
          issuer: this.issuer,
          expire_date: this.expire_date,
          issuer_code: this.issuer_code
      }).then(response => {
        loader.hide()
        if (response.data) {
          this.$swal({
            title: response.data.message,
            text: "Your Certification ID - " + response.data.certification.certificate_id ,
            icon: "success"
          });
          console.log(response.data)
          this.name = ''
          this.description = ''
          this.email = ''
          this.issuer = ''
          this.issuer_code = ''
          this.expire_date = ''
        }

      }).catch(e => {
        this.$swal({
          title: "Error Occurred",
          text: "Please check your inputs" ,
          icon: "error"
        });
        this.errors = e.response.data.errors
        console.log(e.response.data)
        loader.hide()
      })
    }
  }
}
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
.row {
  padding: 10px;
}
.search-form {
  padding-left: 10px;
}
.input {
  margin: 10px;
}
.paginate {
  display: -webkit-inline-box;
  margin: 20px;
}
.error-msg {
  color: red;
}
</style>
