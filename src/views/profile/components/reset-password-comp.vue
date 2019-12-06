<template>
  <Form ref="form" :label-width="150" :rules="rules" :model="data">
    <FormItem label="旧密码" prop="oldpassword">
      <input type="text" v-model="data.oldpassword" />
    </FormItem>
    <FormItem label="新密码" prop="newpassword1">
      <input type="password" v-model="data.newpassword1" />
    </FormItem>
    <FormItem label="再次输入新密码" prop="newpassword2">
      <input type="password" v-model="data.newpassword2" />
    </FormItem>
    <FormItem> <Button color="primary" :loading="isLoading" @click="submit">提交</Button>&nbsp;&nbsp;&nbsp;<Button>取消</Button> </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'reset-password-comp',
  data() {
    return {
      isLoading: false,
      data: {
        oldpassword: null,
        newpassword1: null,
        newpassword2: null
      },
      rules: {
        required: ['oldpassword', 'newpassword1', 'newpassword2'],
        combineRules: [
          {
            refs: ['newpassword1', 'newpassword2'],
            valid: {
              valid: 'equal',
              message: '两次输入的密码不一致'
            }
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      const validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.isLoading = true;
        R.Account.resetPassword(this.data).then(rep => {
          this.isLoading = false;
          if (rep.ok) {
            this.$Message.success('密码修改成功');
          }
        });
      }
    }
  }
};
</script>

<style lang="less"></style>
