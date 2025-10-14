<template>
  <el-form class="form" label-position="top">
    <el-form-item label="Метки" >
      <el-input maxlength="50"/>
    </el-form-item>
    <el-form-item label="Тип записи">
      <el-select>
        <el-option label="Локальная" value="local" />
        <el-option label="LDAP" value="LDAP" />
      </el-select>
    </el-form-item>
    <el-form-item label="Логин">
      <el-input maxlength="100"/>
    </el-form-item>
    <el-form-item label="Пароль">
      <el-input
          type="password"
          show-password
          maxlength="100"
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 24px 0;
  width: 100%;
}
</style>