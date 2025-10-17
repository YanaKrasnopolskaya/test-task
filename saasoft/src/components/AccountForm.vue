<template>
  <el-container class="form-container">
    <el-header class="form-container__header">
      <h2>Учетные записи</h2>
      <el-button type="primary" @click="showNewForm = true">
        <el-icon><Plus /></el-icon>
      </el-button>
    </el-header>
    <el-main>
      <div class="form-container__hint-box">
        <el-icon><QuestionFilled /></el-icon>
        <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель <b>;</b></span>
      </div>
      <AccountList />
      <AccountFormField v-if="showNewForm" :model="newAccount" @save="closeNewForm" @cancel="closeNewForm"/>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Plus, QuestionFilled} from "@element-plus/icons-vue";
import {useAccountsStore} from "@/stores/accounts.ts";
import AccountList from "@/components/AccountList.vue";
import type {Account} from "@/components/types/account.ts";
import AccountFormField from "@/components/AccountFormField.vue";

const store = useAccountsStore();
const {loadFromLocalStorage} = store;

onMounted(() => {
    loadFromLocalStorage();
    }
)

const showNewForm = ref(false);
const newAccount = ref<Account>({
  tags: [],
  type: '',
  login: '',
  password: '',
});

const closeNewForm = () => {
  showNewForm.value = false;
  newAccount.value = {
    tags: [],
    type: '',
    login: '',
    password: '',
  }
}
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  &__hint-box {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-start;
    background-color: #E6E8EB;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 40px;
  }
}

.el-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.el-button {
  width: 48px;
  height: 48px;
  padding: 8px;
  font-size: 24px;
}
</style>