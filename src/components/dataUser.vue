<template>
  <div class="center">
    <table style="border: 1px dashed green;" width="100%">
      <thead>
      <tr>
        <th>#</th>
        <th>ID</th>
        <th>NOMBRE</th>
        <th>APELLIDOS</th>
        <th>ACCIONES</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in datosUsuarios" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ item.id }}</td>
        <td>
          {{ item.firstName }}
          <input type="text" v-model="datosUsuarios[index].firstName" v-if="item.edit" maxlength="32">
        </td>
        <td>
          {{ item.lastName }}
          <input type="text" v-model="datosUsuarios[index].lastName" v-if="item.edit" maxlength="32">
        </td>

        <td>
          <button @click="editarUsuario(item.id)" v-if="!item.edit">EDITAR</button> &nbsp;&nbsp;&nbsp;&nbsp;
          <button @click="guardarUsuario(item.id)" v-if="item.edit">GUARDAR </button>
          <button @click="obtenerDatos" v-if="item.edit">CANCELAR</button>
          <button @click="eliminarUsuario(index+1,item.id, item.firstName + ' ' + item.lastName)" v-if="!item.edit">
            ELIMINAR
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
let datosUsuarios = ref([])
const obtenerDatos = ()=>{
  datosUsuarios.value = []
  axios
      .get('http://localhost:3000/users')
      .then((response) => {
        response.data.forEach((value)=>{
          datosUsuarios.value.push(
              {id: value.id,
                firstName: value.firstName,
                lastName: value.lastName,
                edit: false}
          )
        })
      });
}
const eliminarUsuario = (index, id, nombre)=>{
  if (confirm(`¿QUIERES ELIMINAR A : ${ nombre } ? \n #: ${index}\nID: ${id}`)) {
    axios
        .delete(`http://localhost:3000/users/${id}`)
        .then((response) => {
          alert(';( REGISTRO ELIMINADO');
          obtenerDatos();
          console.log(response)
        });
  } else {
    alert('NO BORRAMOS NADA XD.');
  }
}
const editarUsuario = (id)=>{
  let objIndex = datosUsuarios.value.findIndex((obj => obj.id === id));
  datosUsuarios.value[objIndex].edit = true
}
const guardarUsuario = (id)=>{
  let objIndex = datosUsuarios.value.findIndex((obj => obj.id === id));
  axios
      .put('http://localhost:3000/users',
          {
            id:datosUsuarios.value[objIndex].id,
            firstName:datosUsuarios.value[objIndex].firstName,
            lastName:datosUsuarios.value[objIndex].lastName,
          })
      .then(() => {
        obtenerDatos()
      });
}

onMounted(()=>{
  obtenerDatos()
})
</script>

<style scoped>
.center {
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}
</style>
