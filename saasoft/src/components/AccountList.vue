<template>
  <AccountFormField v-for="(account, index) in accounts" :model="account" :key="index" :index="index"/>
</template>

<script setup lang="ts">
import {useAccountsStore} from "@/stores/accounts.ts";
import {storeToRefs} from "pinia";
import AccountFormField from "@/components/AccountFormField.vue";

const { accounts } = storeToRefs(useAccountsStore());
</script>

<style scoped lang="scss">
.account-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;

}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  align-items: flex-end;
  &__btn {
    border: none;
    width: 24px;
    height: 24px;
    padding: 6px;
    font-size: 20px;
  }
}

.el-form-item {
  margin-bottom: 0;
}
</style>