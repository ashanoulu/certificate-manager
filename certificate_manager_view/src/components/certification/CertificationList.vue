<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <div class="dropdown">
            <select id="dropdownMenuButton" v-model="size" aria-expanded="false" aria-haspopup="true"
                    class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" type="button" @change="getCertifications">
              <option :value="10">10</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
          <table id="tableComponent" class="table table-bordered table-striped tablemobile">
            <thead>
            <tr>
              <th>Certificate ID<i aria-label='Sort Icon' class="bi bi-sort-alpha-down"></i></th>
              <th>Name<i aria-label='Sort Icon' class="bi bi-sort-alpha-down"></i></th>
              <th>Description<i aria-label='Sort Icon' class="bi bi-sort-alpha-down"></i></th>
              <th>E-mail<i aria-label='Sort Icon' class="bi bi-sort-alpha-down"></i></th>
              <th>Issuer<i aria-label='Sort Icon' class="bi bi-sort-alpha-down"></i></th>
              <th>Expire Date<i aria-label='Sort Icon' class="bi bi-sort-alpha-down"></i></th>
              <th><i aria-label='Sort Icon' class="bi bi-sort-alpha-down"></i></th>
              <th><i aria-label='Sort Icon' class="bi bi-sort-alpha-down"></i></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data, index) in certificates" :key="index">
              <td>{{ data.certificate_id }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.description }}</td>
              <td>{{ data.email }}</td>
              <td>{{ data.issuer }}</td>
              <td>{{ formattedDate(data.expire_date) }}</td>
              <td>
                <button @click.prevent="showCertificate(data.certificate_id)" class="btn btn-primary" type="button">View</button>
              </td>
              <td>
                <button @click.prevent="deleteCertificate(data.certificate_id)" class="btn btn-danger" type="button">Delete</button>
              </td>
            </tr>
            </tbody>
          </table>
          <div>
            <paginate
                v-model="page"
                :click-handler="getCertifications"
                :container-class="'paginate'"
                :next-text="'Next'"
                :page-count="total_pages"
                :prev-text="'Prev'"
            >
            </paginate>
          </div>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import paginate from "vuejs-paginate-next";
import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: "certifications-view",
  components: {
    paginate
  },
  data() {
    return {
      size: 10,
      page: 0,
      certificates: []
    }
  },
  mounted() {
    this.getCertifications()
  },
  methods: {
    getCertifications() {
      let loader = useLoading()
      loader.show()
      axios.get("/api/certificates", {
        params: {
          page: this.page,
          pageSize: this.size
        }
      }).then(response => {
        loader.hide()
        if (response.data) {
          this.certificates = response.data.certificates
          console.log(response.data.certificates)
        }
      }).catch(e => {
        alert(e)
      })
    },
    showCertificate(certificate_id) {
      let cert = {}
      let loader = useLoading()
      loader.show()
      axios.get('/api/certificates/' + certificate_id ).then(response => {
        loader.hide()
        if (response.data) {
          cert = response.data.certificate
          const titleHtml = `<strong>Certificate ${ cert.certificate_id }</strong>`
          const innerHtml = `
              Certificate ID - <b>${cert.certificate_id}</b><br>
              Name - <b>${cert.name}</b><br>
              Description - <b>${cert.description}</b><br>
              E-mail - <b>${cert.email}</b><br>
              Issuer - <b>${cert.issuer}</b><br>
              Expire Date - <b>${ this.formattedDate(cert.expire_date) }</b><br>`;
          this.$swal({
            title: titleHtml,
            icon: "info",
            html: innerHtml,
            showCloseButton: true,
            focusConfirm: true,
            confirmButtonText: `<i class="fa fa-thumbs-up"></i> OK`,
            confirmButtonAriaLabel: "Thumbs up, great!"
          })
        }
      })
    },
    deleteCertificate(certificate_id) {
      if (certificate_id) {
        axios.delete("/api/certificates/" + certificate_id).then(response => {
          if (response) {
            this.$swal('Success!', 'You have successfully deleted the certification!', 'success')
          }
          this.getCertifications()
        }).catch(e => {
          alert(e)
        })
      }
    },
    formattedDate(inputDateString) {
      const inputDate = new Date(inputDateString);

      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      const day = inputDate.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

.row {
  padding: 10px;
}

.input {
  margin: 10px;
}
.paginate {
  display: -webkit-inline-box;
  margin: 20px;
}

@media only screen and (max-width: 480px) {
  /* horizontal scrollbar for tables if mobile screen */
  .tablemobile {
    overflow-x: auto;
    display: block;
  }
}
</style>
