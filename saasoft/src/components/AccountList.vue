<template>
  <el-container class="account-container">
    <el-header class="account-container__header">
      <h2>Учетные записи</h2>
      <el-button>
        <el-icon><Plus /></el-icon>
      </el-button>
    </el-header>
    <el-main class="account-list">
      <div class="account-list__hint-box">
        <el-icon><QuestionFilled /></el-icon>
        <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель <b>;</b></span>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {Plus, QuestionFilled} from "@element-plus/icons-vue";

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

.account-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
</style>