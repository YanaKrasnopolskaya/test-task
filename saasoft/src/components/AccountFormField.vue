<template>
  <el-form class="form" :model="model" :rules="rules" ref="form">
    <el-form-item prop="tags" label="Метки" label-position="top">
      <el-input maxlength="50" v-model="tagsInput" @blur="onValid"></el-input>
    </el-form-item>
    <el-form-item prop="type" label="Тип" label-position="top">
      <el-select v-model="model.type" @change="onValid">
        <el-option label="Локальная" value="local" />
        <el-option label="LDAP" value="LDAP" />
      </el-select>
    </el-form-item>
    <el-form-item prop="login" label="Логин" label-position="top">
      <el-input v-model="model.login" maxlength="100" placeholder="Введите логин" @blur="onValid"></el-input>
    </el-form-item>
    <el-form-item prop="password" v-if="model.type != 'LDAP'" label="Пароль" label-position="top">
      <el-input v-model="model.password" maxlength="100" type="password" show-password placeholder="Введите пароль" @blur="onValid" @change="changeType"></el-input>
    </el-form-item>
    <el-button class="form__btn" @click="removeAccountLocal(index)">
      <el-icon><Delete /></el-icon>
    </el-button>
  </el-form>
</template>
<script setup lang="ts">
import {Delete} from "@element-plus/icons-vue";
import {ref, watch} from "vue";
import type {Account} from "@/components/types/account.ts";
import {stringifyTags, updateTags} from "@/components/utils/useTags.ts";
import {useAccountsStore} from "@/stores/accounts.ts";
import type {FormInstance} from "element-plus"
import {rules, validCheck} from "@/components/utils/useValidate.ts";
import {storeToRefs} from "pinia";
import { changeType } from "@/components/utils/useTypes.ts"

const props = defineProps<{
  model: Account,
  index?: number
}>();

const emit = defineEmits(["save", "cancel"]);
const store = useAccountsStore();
const {accounts} = storeToRefs(store);
const {addAccount, removeAccount} = store;
const tagsInput = ref<string>("");
const form = ref<FormInstance>();

watch(
    props.model,
    (newVal) => {
      tagsInput.value = stringifyTags(newVal.tags);
    },
    { immediate: true, deep: true }
)

const onValid = async () => {
  updateTags(props.model, tagsInput.value);
  const valid = await validCheck(form.value);
  const account = props.model;
  const index = props.index;

  if (!valid) {
    return;
  }
  if (index === undefined || !accounts.value[index]) {
    addAccount(account);
  } else {
    accounts.value[index] = account;
  }
  emit("save");
}

const removeAccountLocal = (index?: number)  => {
  if (index === undefined) {
    emit("cancel");
  } else {
    removeAccount(index);
  }
  tagsInput.value = "";
}
</script>

<style lang="scss" scoped>
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