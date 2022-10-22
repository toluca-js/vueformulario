<template>
  <div class="center">
    <table style="border: 1px dashed green;" width="100%">
      <tr>
        <td>
          <label for="nombre"><b>Nombre(s) Usuario:</b></label>
          <input v-model="datosUsuario.nombre" type="text" id="nombre" maxlength="32" placeholder="Ingres el nombre de usuario">
          <br>
          <span v-if="validarNombre" style="font-weight: bold; color: red">Ingrese el nombre</span>
          <span v-else style="font-weight: bold; color: green">OK :)</span>
        </td>
        <td>
          <label for="apellidos"><b>Apellidos Usuario:</b></label>
          <input v-model="datosUsuario.apellidos" type="text" id="apellidos" maxlength="32" placeholder="Ingres los apellidos del usuario">
          <br>
          <span :class="{'error': validarApellidos, 'success': !validarApellidos,}">
            {{ validarApellidos ? "Ingrese Apellidos" : "OK :)" }}
          </span>
        </td>
        <td>
          <button type="button" v-if="!validarApellidos && !validarNombre" @click="guardarUsuario">
            REGISTRAR USUARIO :)
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import axios from "axios";
let datosUsuario = ref({ nombre:'', apellidos:'', errorNombre: false, errorApellidos: false });
const validarNombre = computed(()=>{return datosUsuario.value.nombre === '';})
const validarApellidos = computed(()=>{return datosUsuario.value.apellidos === '';})
const guardarUsuario = ()=>{
  axios
      .post('http://localhost:3000/users',
          { firstName: datosUsuario.value.nombre,
            lastName:datosUsuario.value.apellidos })
      .then((response) => {
        alert("PETICION ENVIADA\n ID RESPUESTA:\n" + response.data.id)
        datosUsuario.value.nombre = '';
        datosUsuario.value.apellidos = '';
        console.log(response)
      });
}
</script>

<style scoped>
.center {
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
}
.error{
  font-weight: bold; color: red;
}
.success{
  font-weight: bold; color: green;
}
</style>
