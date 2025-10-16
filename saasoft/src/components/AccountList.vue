<template>
  <div class="account-list-wrapper">
    <div class="account-list-wrapper__hint-box">
      <el-icon><QuestionFilled /></el-icon>
      <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель <b>;</b></span>
    </div>
    <div class="account-list" v-for="(account, index) in accounts" :key="index">
      <div class="account-list__name-wrapper">
        <span class="account-list__name">Метки</span>
        <span class="account-list__name">Тип</span>
        <span class="account-list__name">Логин</span>
        <template v-if="account.type === 'local'">
          <span  class="account-list__name">Пароль</span>
        </template>
      </div>
      <el-form class="form">
        <el-input
            maxlength="50"
            v-model="tagsInput[index]"
            @blur="updateTags(index)"
        ></el-input>
        <el-select
            v-model="account.type"
            @change="changeType(account)"
            @blur="saveToLocalStorage"
        >
          <el-option label="Локальная" value="local" />
          <el-option label="LDAP" value="LDAP" />
        </el-select>
        <el-input
            v-model="account.login"
            maxlength="100"
            placeholder="Введите логин"
            @blur="saveToLocalStorage"
        ></el-input>
        <template v-if="account.type === 'local'">
          <el-input
              v-model="account.password"
              maxlength="100"
              type="password"
              show-password
              placeholder="Введите пароль"
              @blur="saveToLocalStorage"
          ></el-input>
        </template>
        <el-button class="form__btn" @click="removeAccountLocal(index)" @blur="saveToLocalStorage">
          <el-icon><Delete /></el-icon>
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Delete, QuestionFilled} from "@element-plus/icons-vue";
import {useAccountsStore} from "@/stores/accounts.ts";
import {storeToRefs} from "pinia";
import type {Account} from "@/components/types/account.ts";
import {ref, watch} from "vue";

const store = useAccountsStore();
const { accounts } = storeToRefs(store);
const { removeAccount, parseTags, stringifyTags, saveToLocalStorage} = store;
const tagsInput = ref<string[]>([]);

watch(
    accounts,
    (newValue) => {
          tagsInput.value = newValue.map(account => stringifyTags(account.tags));
    },
    { immediate: true }
)

const updateTags = (index: number) => {
  const value = tagsInput.value[index];
  const account = accounts.value[index];

  if(!value || !account) {
    return;
  }
  account.tags = parseTags(value);
  saveToLocalStorage();
}

const changeType = (account: Account) => {
  if (account.type === "LDAP") {
    account.password = null;
  }
}

const removeAccountLocal = (index: number)  => {
  removeAccount(index)
  tagsInput.value.splice(index, 1)
}
</script>

<style scoped lang="scss">
.account-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  &__hint-box {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-start;
    background-color: #E6E8EB;
    padding: 8px;
    border-radius: 4px;
  }
}
.account-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  &__name-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }
  &__name {
    font-size: 16px;
    color: #53595e;
  }
}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  align-items: center;
  &__btn {
    border: none;
    width: 24px;
    height: 24px;
    padding: 6px;
    font-size: 20px;
  }
}
</style>