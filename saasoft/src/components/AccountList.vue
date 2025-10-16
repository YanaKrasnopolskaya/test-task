<template>
  <div class="account-list-wrapper">
    <div class="account-list-wrapper__hint-box">
      <el-icon><QuestionFilled /></el-icon>
      <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель <b>;</b></span>
    </div>
    <div class="account-list"
         v-for="(account, index) in accounts"
         :key="index">
      <el-form
          class="form"
          :model="accounts[index]"
          :rules="rules"
          ref="forms"
      >
        <el-form-item
            prop="tags"
            label="Метки"
            label-position="top">
          <el-input
              maxlength="50"
              v-model="tagsInput[index]"
              @blur="updateTags(index)"
          ></el-input>
        </el-form-item>
        <el-form-item
            prop="type"
            label="Тип"
            label-position="top">
          <el-select
              v-model="account.type"
              @change="typesCheck(account, index)"
          >
            <el-option label="Локальная" value="local" />
            <el-option label="LDAP" value="LDAP" />
          </el-select>
        </el-form-item>
        <el-form-item
            prop="login"
            label="Логин"
            label-position="top">
          <el-input
              v-model="account.login"
              maxlength="100"
              placeholder="Введите логин"
              @blur="validCheck(account, index)"
          ></el-input>
        </el-form-item>
        <el-form-item
            prop="password"
            v-if="account.type != 'LDAP'"
            label="Пароль"
            label-position="top">
          <el-input
              v-model="account.password"
              maxlength="100"
              type="password"
              show-password
              placeholder="Введите пароль"
              @blur="validCheck(account, index)"
          ></el-input>
        </el-form-item>
        <el-button
            class="form__btn"
            @click="removeAccountLocal(index)"
            @blur="saveToLocalStorage">
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
import type {FormInstance} from 'element-plus'

const store = useAccountsStore();
const { accounts } = storeToRefs(store);
const { removeAccount, parseTags, stringifyTags, saveToLocalStorage} = store;
const tagsInput = ref<string[]>([]);
const forms = ref<FormInstance[]>([]);

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
  validCheck(account, index);
}

const changeType = (account: Account) => {
  if (account.type === "LDAP") {
    account.password = null;
  }
}

const removeAccountLocal = (index: number)  => {
  removeAccount(index);
  tagsInput.value.splice(index, 1);
}

const rules = {
  type: [{ required: true, trigger: ['change', 'blur']}],
  login: [{ required: true, trigger: ['blur']}],
  password: [{ required: true, trigger: ['blur']}],
}

const validCheck = (account: Account, index: number) => {
  const form = forms.value[index];

  if (!form) {
    return;
  }
  form.validate((valid: boolean) => {
    if (valid) {
      saveToLocalStorage();
    }
  })
}

const typesCheck = (account: Account, index: number) => {
  changeType(account);
  validCheck(account, index);
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