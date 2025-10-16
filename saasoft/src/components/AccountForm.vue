<template>
  <el-container class="account-container">
    <el-header class="account-container__header">
      <h2>Учетные записи</h2>
      <el-button type="primary" @click="addAccount">
        <el-icon><Plus /></el-icon>
      </el-button>
    </el-header>
    <el-main>
      <AccountList />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {Plus} from "@element-plus/icons-vue";
import {useAccountsStore} from "@/stores/accounts.ts";
import AccountList from "@/components/AccountList.vue";

const store = useAccountsStore();
const {loadFromStorage, addAccount} = store;

onMounted(() => {
      loadFromStorage()
    }
)
</script>

<style scoped lang="scss">
.account-container {
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: center;
    gap: 24px;
  }
}

.el-button {
  width: 48px;
  height: 48px;
  padding: 8px;
  font-size: 24px;
}
</style>